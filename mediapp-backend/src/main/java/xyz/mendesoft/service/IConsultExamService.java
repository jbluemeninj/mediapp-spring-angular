package xyz.mendesoft.service;

import xyz.mendesoft.model.ConsultExam;

import java.util.List;

public interface IConsultExamService {

    List<ConsultExam> getExamsByConsultId(Integer idConsult);

}
