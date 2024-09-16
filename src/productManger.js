const pool = require ('./db')


async function getProduit(){
    const connection = await pool.getConnection()
   const [produit] = await connection.execute('SELECT  id FROM products')
  
   const ids = produit.map(produ => produ.id); 
    
    return ids;

}

async function getProduct() {
    const connection = await pool.getConnection()
    try {
        const [rows] = await connection.execute('SELECT * FROM products')
        
        return rows
    } catch (error) {
        throw error
    } finally {
        connection.release();
    }
}
    
async function addProduct(name, description, price, stock, category, barcode, status){
    const connection = await pool.getConnection()
    try {
        const [result] = await connection.execute('INSERT INTO products (name, description, price, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, description, price, stock, category, barcode, status])
        return result.insertId
    } catch (error) {
        throw error
    } finally {
        connection.release();
    }
} 

async function updateProduct(id, name, description, price, stock, category, barcode, status) {
    const connection = await pool.getConnection();
    try {
        
        const [productExists] = await connection.execute('SELECT 1 FROM products WHERE id = ?', [id]);
        if (productExists.length === 0) {
            throw new Error(`Produit avec l'ID ${id} introuvable.`);
        }

        
        const [result] = await connection.execute(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?',
            [name, description, price, stock, category, barcode, status, id]
        );

        return result.affectedRows;
    } catch (error) {
        
        console.error("Erreur rencontrée:", error.message);
    } finally {
        connection.release(); 
    }
}


async function destroyProduct(id) {
    const connection = await pool.getConnection();
    try {
        
        const [productExists] = await connection.execute('SELECT 1 FROM products WHERE id = ?', [id]);
        if (productExists.length === 0) {
            throw new Error(`Produit avec l'ID ${id} introuvable.`);
        }

        
        const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        return result.affectedRows;
    } catch (error) {
        
        console.error("Erreur rencontrée:", error.message);
    } finally {
        connection.release(); 
    }
}




module.exports = {
    getProduct,
    addProduct,
    destroyProduct,
    updateProduct,
    getProduit

}