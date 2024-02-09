package lk.ijse.gdse66.AAD_Assignment_JavaEE.api;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import lk.ijse.gdse66.AAD_Assignment_JavaEE.db.DBConnection;
import lk.ijse.gdse66.AAD_Assignment_JavaEE.dto.ItemDTO;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "item",urlPatterns = "/item",initParams = {
        @WebInitParam(name = "db-user",value = "root"),
        @WebInitParam(name = "db-pw",value = "ijse123"),
        @WebInitParam(name = "db-url",value = "jdbc:mysql://localhost:3306/pos?createDatabaseIfNotExist=true"),
        @WebInitParam(name = "db-class",value = "com.mysql.cj.jdbc.Driver")
})
public class ItemServlet extends HttpServlet {

    Connection connection;

    @Override
    public void init() throws ServletException {
        try {
            InitialContext initialContext = new InitialContext();
            DataSource dataSource = (DataSource) initialContext.lookup("java:comp/env/jdbc/pos");
            System.out.println(dataSource);
            this.connection = dataSource.getConnection();
            System.out.println(connection);
        } catch (NamingException | SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        var writer = resp.getWriter();
        resp.setContentType("text/html");
        var data = new DBConnection();
        List<ItemDTO> getData = data.getAllItem(connection);

        Jsonb jsonb = JsonbBuilder.create();
        String json = jsonb.toJson(getData);
        writer.write(json);
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            Jsonb jsonb = JsonbBuilder.create();
            var itemDTO = jsonb.fromJson(req.getReader(), ItemDTO.class);
            System.out.println(itemDTO);
            var dbProcess = new DBConnection();
            dbProcess.saveItem(itemDTO, connection);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {
            Jsonb jsonb = JsonbBuilder.create();
            var itemDTO = jsonb.fromJson(req.getReader(), ItemDTO.class);
            System.out.println(itemDTO);
            var dbProcess = new DBConnection();
            dbProcess.updateItem(itemDTO, connection);
        }
    }
}
