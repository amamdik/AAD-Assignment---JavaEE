package lk.ijse.gdse66.AAD_Assignment_JavaEE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO implements Serializable {
    private String order_id;
    private String customer_id;
    private String total;
    private String date;
    private ItemDTO[] items;
}
