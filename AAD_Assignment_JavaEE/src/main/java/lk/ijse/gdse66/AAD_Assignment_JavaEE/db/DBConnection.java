package lk.ijse.gdse66.AAD_Assignment_JavaEE.db;

import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.CustomerDTO;
import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.ItemDTO;
import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.OrderDTO;
import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.OrderDetailsDTO;
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

    public void saveItem(ItemDTO itemDTO, Connection connection) {

        try {
            var ps = connection.prepareStatement(SAVE_ITEM);
            ps.setString(1, itemDTO.getItem_id());
            ps.setString(2, itemDTO.getDescr());
            ps.setString(3, itemDTO.getPrice());
            ps.setString(4, itemDTO.getQty());

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

    public List<ItemDTO> getAllItem(Connection connection) {
        List<ItemDTO> itemDTOS = new ArrayList<>();

        try {
            var ps = connection.prepareStatement(GET_ALL_ITEMS);
            ResultSet resultSet = ps.executeQuery();


            while (resultSet.next()) {

                itemDTOS.add(new ItemDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4)
                ));

            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return itemDTOS;
    }

    public void updateItem(ItemDTO itemDTO, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_ITEM);
            ps.setString(1, itemDTO.getDescr());
            ps.setString(2, itemDTO.getPrice());
            ps.setString(3, itemDTO.getQty());
            ps.setString(4, itemDTO.getItem_id());

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

    public boolean saveOrder(OrderDTO orderDTO, Connection connection) {
        try {
            var ps = connection.prepareStatement(SAVE_ORDER);
            ps.setString(1, orderDTO.getOrder_id());
            ps.setString(2, orderDTO.getCustomer_id());
            ps.setString(3, orderDTO.getDate());
            ps.setString(4, orderDTO.getTotal());

            if (ps.executeUpdate() != 0) {
                logger.info("Order saved successfully");
                System.out.println("Data saved");
                return true;
            } else {
                logger.info("Order saving failed");
                System.out.println("Failed to save");
                return false;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    public boolean saveOrderDetails(OrderDTO orderDTO, Connection connection){
        try {
            var ps = connection.prepareStatement(SAVE_ORDER_DETAILS);
            for (ItemDTO itemDTO : orderDTO.getItems()) {
                ps.setString(1, orderDTO.getOrder_id());
                ps.setString(2, itemDTO.getItem_id());
                ps.setString(3, itemDTO.getQty());

                if (ps.executeUpdate() == 0) {
                    logger.info("Order details saving failed");
                    System.out.println("Failed to save");
                    return false;
                }
            }
            logger.info("Order details saved successfully");
            System.out.println("Data saved");
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<OrderDetailsDTO> getAllOrders(Connection connection) {
        List<OrderDetailsDTO> orderDTOS = new ArrayList<>();

        try {
            var ps = connection.prepareStatement(GET_ALL_ORDERS);
            ResultSet resultSet = ps.executeQuery();

            while (resultSet.next()) {
                orderDTOS.add(new OrderDetailsDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4)
                ));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return orderDTOS;
    }

}
