package lk.ijse.gdse66.AAD_Assignment_JavaEE.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CustomerDTO implements Serializable {
    private String customer_id;
    private String name;
    private String address;
    private String contact;
}
