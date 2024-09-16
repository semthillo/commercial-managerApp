const pool = require ('./db')

async function getCustomer() {
    const connection = await pool.getConnection()
    try {
        const [rows] = await connection.execute('SELECT * FROM customers')
        return rows
    } catch (error) {
        throw error
    } finally {
        connection.release();
    }
}
    
async function addCustomer(name, address, email, phone){
    const connection = await pool.getConnection()
    try {
        const [result] = await connection.execute('INSERT INTO customers (name, address, email, phone)VALUES (?, ?, ?, ?)', [name, address, email, phone])
        
        
        return result.insertId
    } catch (error) {
        throw error
    } finally {
        connection.release();
    }
} 

async function updateCustomer(id, name, address, email, phone) {
    const connection = await pool.getConnection();
    try {
        
        
        const [result] = await connection.execute('UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?', [name, address, email, phone, id]);
        return result.affectedRows;
    } catch (error) {
        console.error("erreur de suppression")
    } finally {
        connection.release();
    }
}

async function destroyCustomer(id) {
    const connection = await pool.getConnection();
    try {
        const [customer] = await connection.execute('SELECT id FROM customers WHERE id = ?', [id]);
        if (customer.length === 0) {
            throw new Error(`Le client avec l'ID ${id} n'existe pas.`);
        }

        const [orders] = await connection.execute('SELECT 1 FROM purchase_orders WHERE customer_id = ?', [id]);
        if (orders.length > 0) {
            console.error(`Le client avec l'ID ${id} ne peut pas être supprimé car il a déjà passé des commandes.`);
            return;
        }

        const [result] = await connection.execute('DELETE FROM customers WHERE id = ?', [id]);
        console.log("Client supprimé");
        return result.affectedRows;
    } catch (error) {
       
        console.error("Impossible de supprimer:", error.message);
    } finally {
        connection.release(); 
    }
}

async function getClient(id) {
    const connection = await pool.getConnection();
    const [customer] = await connection.execute('SELECT * FROM customers WHERE id = ?', [id]);
        if (customer.length === 0) {
            throw new Error(`Le client avec l'ID ${id} n'existe pas`);
        }
        
}
async function getEmailClient() {
    const connection = await pool.getConnection();
    const [customer] = await connection.execute('SELECT email FROM customers')
        
        const custs = customer.map(cust => cust.email); 
    
        
        return custs;
}

async function getPhoneClient() {
    const connection = await pool.getConnection();
    const [customer] = await connection.execute('SELECT phone FROM customers')
        
        const custs = customer.map(cust => cust.phone); 
    
        
        return custs;
}








module.exports = {
    getCustomer,
    addCustomer,
    destroyCustomer,
    updateCustomer,
    getClient,
    getEmailClient,
    getPhoneClient

}