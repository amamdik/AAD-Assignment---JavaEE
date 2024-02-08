package lk.ijse.gdse66.AAD_Assignment_JavaEE.db;

import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.CustomerDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DBConnection {
    static final Logger logger = LoggerFactory.getLogger(DBConnection.class);
    private static final String SAVE_CUSTOMER = "INSERT INTO customer(customer_id,name,address,contact) VALUES(?,?,?,?);";

    private static final String GET_ALL_CUSTOMER = "SELECT * FROM customer;";
    private static final String UPDATE_CUSTOMER = "UPDATE customer SET name=?,address=?,contact=? WHERE customer_id=?;";

    private static final String DELETE_CUSTOMER = "DELETE FROM customer WHERE customer_id=?;";


    private static final String SAVE_ITEM = "INSERT INTO item(item_id,descr,price,qty) VALUES(?,?,?,?);";

    private static final String GET_ALL_ITEMS = "SELECT * FROM item;";

    private static final String UPDATE_ITEM = "UPDATE item SET descr=?,price=?,qty=? WHERE item_id=?;";

    private static final String SAVE_ORDER = "INSERT INTO order_details(order_id,customer_id,date,total) VALUES(?,?,?,?);";

    private static final String SAVE_ORDER_DETAILS = "INSERT INTO order_item(order_id,item_id,qty) VALUES(?,?,?);";

    private static final String GET_ALL_ORDERS = "SELECT * FROM order_details;";


    public void saveCustomer(CustomerDTO customerDTO, Connection connection) {

        try {
            var ps = connection.prepareStatement(SAVE_CUSTOMER);
            ps.setString(1, customerDTO.getCustomer_id());
            ps.setString(2, customerDTO.getName());
            ps.setString(3, customerDTO.getAddress());
            ps.setString(4, customerDTO.getContact());

            if (ps.executeUpdate() != 0) {
                logger.info("Item saved successfully");
                System.out.println("Data saved");
            } else {
                logger.info("Item saving failed");
                System.out.println("Failed to save");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    public List<CustomerDTO> getAllCustomer(Connection connection) {
        List<CustomerDTO> customerDTOs = new ArrayList<>();

        try {
            var ps = connection.prepareStatement(GET_ALL_CUSTOMER);
            ResultSet resultSet = ps.executeQuery();


            while (resultSet.next()) {

                customerDTOs.add(new CustomerDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4)
                ));

            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return customerDTOs;
    }

    public void updateCustomer(CustomerDTO customerDTO, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_CUSTOMER);
            ps.setString(1, customerDTO.getName());
            ps.setString(2, customerDTO.getAddress());
            ps.setString(3, customerDTO.getContact());
            ps.setString(4, customerDTO.getCustomer_id());

            if (ps.executeUpdate() != 0) {
                logger.info("Item updated successfully");
                System.out.println("Data updated");
            } else {
                logger.info("Item updating failed");
                System.out.println("Failed to update");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteCustomer(CustomerDTO customerDTO, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_CUSTOMER);
            ps.setString(1, customerDTO.getCustomer_id());

            if (ps.executeUpdate() != 0) {
                logger.info("Item deleted successfully");
                System.out.println("Data deleted");
            } else {
                logger.info("Item deleting failed");
                System.out.println("Failed to delete");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
