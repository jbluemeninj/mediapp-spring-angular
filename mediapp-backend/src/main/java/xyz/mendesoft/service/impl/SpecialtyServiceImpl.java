package xyz.mendesoft.service.impl;

import xyz.mendesoft.model.Specialty;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.repo.ISpecialtyRepo;
import xyz.mendesoft.service.ISpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SpecialtyServiceImpl extends CRUDImpl<Specialty, Integer> implements ISpecialtyService {

    //@Autowired
    private final ISpecialtyRepo repo;// = new SpecialtyRepo();

    @Override
    protected IGenericRepo<Specialty, Integer> getRepo() {
        return repo;
    }
}
