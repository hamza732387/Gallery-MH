const {createDatabaseConnection, DB_NAME} = require('../database/config');

function checkTraineeEmailExists(email, callback) {
    const sql = `SELECT COUNT(*) as count from ${DB_NAME}.regstration WHERE email = "${email}"`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
                if (callback) {
                    callback(error,result[0].count>0);
                }
        
                connection.end();
            });
        }
    });
}
function addTraineeAccount(name,email,password,address,phone,callback){
const sql=`INSERT INTO ${DB_NAME}.regstration (name, email, password, address, phone) VALUES('${name}', '${email}', '${password}', '${address}', '${phone}');`
createDatabaseConnection((connectError, connection) => {
    console.log(connectError);
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end()
        });
    }
});
}

function checkPasswordDB(email , callback) {
    const sql = `select password from ${DB_NAME}.regstration where email ='${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);
    
                connection.end();
            });
        }
    });
}

function showNameWithLogIn(email , callback){
    const sql = `select name,id, password from ${DB_NAME}.regstration where email ='${email}'`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdatePasswordTrainee(id , newPassword , callback){
    const sql = `UPDATE ${DB_NAME}.regstration SET password = '${newPassword}' WHERE (id = '${id}')`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function UpdateInformationTrainee(id ,imgpath, traineeName , phone , address , callback){

    let params = `name = '${traineeName}', address = '${address}', phone = '${phone}'`;

    if (imgpath !== '') {
        params += `,photo='${imgpath}'`
    }
    
    const sql = `UPDATE ${DB_NAME}.regstration SET ${params} WHERE (id = '${id}')`;
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                    callback(error,result);

                connection.end();
            });
        }
    });
}


function getmyprofile(id , callback) {
const sql = `select id,name,address,phone,email,photo from ${DB_NAME}.regstration where id=${id}` ;
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end();
        });
    }
});
}

function addImage(id,name,photo,sallery,size,kind,notes,callback){
    const sql = `INSERT INTO ${DB_NAME}.add_picture (name, photo, sallery, size, date_end, kind, notes, id_user) VALUES 
    ('${name}', '${photo}', '${sallery}', '${size}', '2222/2/2', '${kind}', '${notes}', '${id}');` 
createDatabaseConnection((connectError, connection) => {
    if (connectError) {
        callback(connectError, null);
    } else {
        connection.query(sql, (error, result) => {
         
                callback(error,result);

            connection.end();
        });
    }
});

}

function getImages(id,data){
    const sql = `select add_picture.photo,add_picture.name,add_picture.sallery,add_picture.size,add_picture.kind,add_picture.notes,add_picture.id,add_picture.id_user
    from add_picture
    inner join regstration 
    on add_picture.id_user=regstration.id where add_picture.id_user=${id}`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
    });
    
     
}
function getAllImages(data){
    const sql = `SELECT * FROM ${DB_NAME}.add_picture;`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
    });

}
function getDataImage(id,data){
    const sql = `SELECT add_picture.name,add_picture.sallery FROM ${DB_NAME}.add_picture where add_picture.id=${id}`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
    });

}
function editImage(id,name,sallery,data){
    const sql = `UPDATE  ${DB_NAME}.add_picture SET name = '${name}', sallery = '${sallery}'WHERE (id = '${id}');`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
    });

}
function deleteImage(id,data){
    const sql = `DELETE FROM ${DB_NAME}.add_picture WHERE (id = '${id}')`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
    });

}
function getByIDImages(id,data){
    const sql = `SELECT * FROM ${DB_NAME}.add_picture where add_picture.id=${id}`
    createDatabaseConnection((connectError, connection) => {
        if (connectError) {
            callback(connectError, null);
        } else {
            connection.query(sql, (error, result) => {
             
                   data(result)
    
                connection.end();
            });
        }
        
    });
    
     
}

module.exports = {
    checkTraineeEmailExists,addTraineeAccount,checkPasswordDB,showNameWithLogIn,UpdatePasswordTrainee,
    getmyprofile,UpdateInformationTrainee,addImage,getImages,getAllImages,getDataImage,editImage,deleteImage,getByIDImages


};