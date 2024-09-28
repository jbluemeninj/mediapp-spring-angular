package xyz.mendesoft.service.impl;

import xyz.mendesoft.model.ConsultExam;
import xyz.mendesoft.repo.IConsultExamRepo;
import xyz.mendesoft.service.IConsultExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultExamServiceImpl implements IConsultExamService {

    private final IConsultExamRepo repo;

    @Override
    public List<ConsultExam> getExamsByConsultId(Integer idConsult) {
        return repo.getExamsByConsultId(idConsult);
    }
}
