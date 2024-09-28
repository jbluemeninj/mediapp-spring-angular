package xyz.mendesoft.service.impl;

import xyz.mendesoft.model.Exam;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.repo.IExamRepo;
import xyz.mendesoft.service.IExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl extends CRUDImpl<Exam, Integer> implements IExamService {

    //@Autowired
    private final IExamRepo repo;// = new ExamRepo();

    @Override
    protected IGenericRepo<Exam, Integer> getRepo() {
        return repo;
    }
}
