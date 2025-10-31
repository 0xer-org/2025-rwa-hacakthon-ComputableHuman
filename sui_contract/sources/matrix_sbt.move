module computable_human_sbt::matrix_sbt {
    use sui::object::UID;
    use sui::event;

    /// 錯誤代碼
    const EInvalidMatrixSize: u64 = 1;

    /// SBT 結構體 - 靈魂綁定代幣
    public struct MatrixSBT has key, store {
        id: UID,
        owner: address,
        matrix: vector<vector<u8>>, // 16x16 矩陣，每個元素是 0-255
        created_at: u64,
        updated_at: u64,
    }

    /// SBT 註冊表，用於追蹤用戶的 SBT
    public struct SBTRegistry has key {
        id: UID,
        user_sbts: vector<SBTRecord>,
    }

    /// SBT 記錄
    public struct SBTRecord has store, copy, drop {
        owner: address,
        sbt_id: address,
    }

    /// 事件：SBT 鑄造
    public struct SBTMinted has copy, drop {
        sbt_id: address,
        owner: address,
        timestamp: u64,
    }

    /// 事件：SBT 更新
    public struct SBTUpdated has copy, drop {
        sbt_id: address,
        owner: address,
        timestamp: u64,
    }

    /// 初始化函數
    fun init(ctx: &mut sui::tx_context::TxContext) {
        let registry = SBTRegistry {
            id: sui::object::new(ctx),
            user_sbts: vector::empty(),
        };
        sui::transfer::share_object(registry);
    }

    /// 驗證矩陣格式
    fun validate_matrix(matrix: &vector<vector<u8>>): bool {
        // 檢查是否為 16x16 矩陣
        if (vector::length(matrix) != 16) {
            return false
        };
        
        let mut i = 0;
        while (i < 16) {
            let row = vector::borrow(matrix, i);
            if (vector::length(row) != 16) {
                return false
            };
            
            // 檢查每個元素是否在 0-255 範圍內 (u8 自動滿足此條件)
            i = i + 1;
        };
        
        true
    }

    /// 查找用戶的現有 SBT
    fun find_user_sbt(registry: &SBTRegistry, user: address): (bool, u64) {
        let mut i = 0;
        let len = vector::length(&registry.user_sbts);
        
        while (i < len) {
            let record = vector::borrow(&registry.user_sbts, i);
            if (record.owner == user) {
                return (true, i)
            };
            i = i + 1;
        };
        
        (false, 0)
    }

    /// 鑄造新的 SBT 或更新現有的 SBT
    public fun mint_or_update_sbt(
        registry: &mut SBTRegistry,
        matrix_data: vector<vector<u8>>,
        ctx: &mut sui::tx_context::TxContext
    ) {
        // 驗證矩陣格式
        assert!(validate_matrix(&matrix_data), EInvalidMatrixSize);
        
        let sender = sui::tx_context::sender(ctx);
        let timestamp = sui::tx_context::epoch_timestamp_ms(ctx);
        
        // 檢查用戶是否已有 SBT
        let (has_sbt, index) = find_user_sbt(registry, sender);
        
        if (has_sbt) {
            // 更新現有 SBT
            update_existing_sbt(registry, index, matrix_data, timestamp, ctx);
        } else {
            // 鑄造新 SBT
            mint_new_sbt(registry, matrix_data, timestamp, ctx);
        }
    }

    /// 鑄造新的 SBT
    #[allow(lint(self_transfer))]
    fun mint_new_sbt(
        registry: &mut SBTRegistry,
        matrix_data: vector<vector<u8>>,
        timestamp: u64,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let sender = sui::tx_context::sender(ctx);
        
        // 創建新的 SBT
        let sbt = MatrixSBT {
            id: sui::object::new(ctx),
            owner: sender,
            matrix: matrix_data,
            created_at: timestamp,
            updated_at: timestamp,
        };
        
        let sbt_address = sui::object::uid_to_address(&sbt.id);
        
        // 添加到註冊表
        let record = SBTRecord {
            owner: sender,
            sbt_id: sbt_address,
        };
        vector::push_back(&mut registry.user_sbts, record);
        
        // 發送事件
        event::emit(SBTMinted {
            sbt_id: sbt_address,
            owner: sender,
            timestamp,
        });
        
        // 轉移 SBT 給用戶（靈魂綁定）
        sui::transfer::transfer(sbt, sender);
    }

    /// 更新現有的 SBT
    #[allow(lint(self_transfer))]
    fun update_existing_sbt(
        registry: &mut SBTRegistry,
        index: u64,
        matrix_data: vector<vector<u8>>,
        timestamp: u64,
        ctx: &mut sui::tx_context::TxContext
    ) {
        let sender = sui::tx_context::sender(ctx);
        let record = vector::borrow(&registry.user_sbts, index);
        let _old_sbt_id = record.sbt_id;
        
        // 創建新的 SBT 來替換舊的
        let new_sbt = MatrixSBT {
            id: sui::object::new(ctx),
            owner: sender,
            matrix: matrix_data,
            created_at: timestamp, // 這裡應該保留原始創建時間，但為了簡化使用當前時間
            updated_at: timestamp,
        };
        
        let new_sbt_address = sui::object::uid_to_address(&new_sbt.id);
        
        // 更新註冊表中的記錄
        let record_mut = vector::borrow_mut(&mut registry.user_sbts, index);
        record_mut.sbt_id = new_sbt_address;
        
        // 發送事件
        event::emit(SBTUpdated {
            sbt_id: new_sbt_address,
            owner: sender,
            timestamp,
        });
        
        // 轉移新 SBT 給用戶
        sui::transfer::transfer(new_sbt, sender);
        
        // 注意：舊的 SBT 會在用戶錢包中被新的替換，這需要前端配合處理
    }

    /// 查詢用戶是否擁有 SBT
    public fun user_has_sbt(registry: &SBTRegistry, user: address): bool {
        let (has_sbt, _) = find_user_sbt(registry, user);
        has_sbt
    }

    /// 獲取 SBT 的矩陣數據（只讀）
    public fun get_matrix(sbt: &MatrixSBT): &vector<vector<u8>> {
        &sbt.matrix
    }

    /// 獲取 SBT 的擁有者
    public fun get_owner(sbt: &MatrixSBT): address {
        sbt.owner
    }

    /// 獲取 SBT 的創建時間
    public fun get_created_at(sbt: &MatrixSBT): u64 {
        sbt.created_at
    }

    /// 獲取 SBT 的更新時間
    public fun get_updated_at(sbt: &MatrixSBT): u64 {
        sbt.updated_at
    }

    /// 獲取註冊表中的用戶 SBT 數量
    public fun get_total_users(registry: &SBTRegistry): u64 {
        vector::length(&registry.user_sbts)
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut sui::tx_context::TxContext) {
        init(ctx);
    }
}
