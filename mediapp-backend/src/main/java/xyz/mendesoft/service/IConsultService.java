package xyz.mendesoft.service;

import xyz.mendesoft.dto.ConsultProcDTO;
import xyz.mendesoft.dto.IConsultProcDTO;
import xyz.mendesoft.model.Consult;
import xyz.mendesoft.model.Exam;

import java.time.LocalDateTime;
import java.util.List;

public interface IConsultService extends ICRUD<Consult, Integer> {

    Consult saveTransactional(Consult consult, List<Exam> exams);
    List<Consult> search(String dni, String fullname);
    List<Consult> searchByDates(LocalDateTime date1, LocalDateTime date2);
    List<ConsultProcDTO> callProcedureOrFunctionNative();
    List<IConsultProcDTO> callProcedureOrFunctionProjection();
    byte[] generateReport() throws Exception;

}
