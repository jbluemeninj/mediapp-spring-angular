package xyz.mendesoft.repo;

import xyz.mendesoft.dto.ConsultProcDTO;
import xyz.mendesoft.dto.IConsultProcDTO;
import xyz.mendesoft.model.Consult;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface IConsultRepo extends IGenericRepo<Consult, Integer>{

    //FR: Jaime Medina -> jaime medina
    //BK BD: jaime medina
    @Query("FROM Consult c WHERE c.patient.dni = :dni OR LOWER(c.patient.firstName) LIKE %:fullname% OR LOWER(c.patient.lastName) LIKE %:fullname%")
    List<Consult> search(@Param("dni") String dni, @Param("fullname") String fullname);

    // >=       |   <
    //15-09-23 al 30-09-23
    @Query("FROM Consult c WHERE c.consultDate BETWEEN :date1 AND :date2")
    List<Consult> searchByDates(@Param("date1")LocalDateTime date1, @Param("date2") LocalDateTime date2);

    @Query(value = "select * from fn_list()", nativeQuery = true)
    List<Object[]> callProcedureOrFunctionNative();
    @Query(value = "select * from fn_list()", nativeQuery = true)
    List<IConsultProcDTO> callProcedureOrFunctionProjection();

}
