package xyz.mendesoft.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import xyz.mendesoft.model.Patient;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.repo.IPatientRepo;
import xyz.mendesoft.service.IPatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl extends CRUDImpl<Patient, Integer> implements IPatientService {

    //@Autowired
    private final IPatientRepo repo;// = new PatientRepo();

    @Override
    protected IGenericRepo<Patient, Integer> getRepo() {
        return repo;
    }


    @Override
    public Page<Patient> listPage(Pageable pageable) {
        return repo.findAll(pageable);    }
}
