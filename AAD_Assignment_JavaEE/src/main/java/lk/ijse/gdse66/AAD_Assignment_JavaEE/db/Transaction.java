package lk.ijse.gdse66.AAD_Assignment_JavaEE.db;

import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;

public class Transaction {
    public void orderTransaction(OrderDTO orderDTO, Connection connection) throws SQLException {
        connection.setAutoCommit(false);

        try {
            var dbProcess = new DBConnection();
            if (dbProcess.saveOrder(orderDTO, connection)) {
                if (dbProcess.saveOrderDetails(orderDTO, connection)) {
                    connection.setAutoCommit(true);
                } else {
                    connection.rollback();
                }
            } else {
                connection.rollback();

            }
        } catch (SQLException e) {
            connection.rollback();
            throw e;
        } finally {
            connection.setAutoCommit(true);
        }

    }
}
