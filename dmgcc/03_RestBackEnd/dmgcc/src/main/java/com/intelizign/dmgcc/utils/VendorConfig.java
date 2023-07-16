package com.intelizign.dmgcc.utils;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentityGenerator;

public class VendorConfig extends IdentityGenerator{


	
	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		
		  Connection connection = session.connection();
		    Statement statement = null;
		    try {
		         statement=connection.createStatement();

		        ResultSet rs=statement.executeQuery("select count(id) as Id from vendor");

		        if(rs.next())
		        { 
		        	return rs.getLong(1)+1;
		        }
		    } catch (SQLException e) {
		       
		        e.printStackTrace();
		    }
	       finally {
				
				if(statement!=null) {
					try {
						statement.close();
					} catch (SQLException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}	
				}
		    return null;

	}

}
