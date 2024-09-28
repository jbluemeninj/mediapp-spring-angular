package xyz.mendesoft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PatientDTO {

    private Integer idPatient;
    private String firstName;
    private String lastName;
    private String dni;
    private String address;
    private String phone;
    private String email;
}
