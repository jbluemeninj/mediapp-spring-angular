package xyz.mendesoft.service.impl;

import xyz.mendesoft.model.Medic;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.repo.IMedicRepo;
import xyz.mendesoft.service.IMedicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicServiceImpl extends CRUDImpl<Medic, Integer> implements IMedicService {

    //@Autowired
    private final IMedicRepo repo;// = new MedicRepo();

    @Override
    protected IGenericRepo<Medic, Integer> getRepo() {
        return repo;
    }
}
