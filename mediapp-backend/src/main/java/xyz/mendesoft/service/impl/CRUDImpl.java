package xyz.mendesoft.service.impl;

import xyz.mendesoft.exception.ModelNotFoundException;
import xyz.mendesoft.repo.IGenericRepo;
import xyz.mendesoft.service.ICRUD;

import java.lang.reflect.Method;
import java.util.List;

public abstract class CRUDImpl<T, ID> implements ICRUD<T, ID> {

    protected abstract IGenericRepo<T, ID> getRepo();

    @Override
    public T save(T t) {
        return getRepo().save(t);
    }

    @Override
    public T update(T t, ID id) throws Exception{
        Class<?> clazz = t.getClass();
        String className = t.getClass().getSimpleName();
        String methodName = "setId" + className;  //genera el setIdAlgo
        Method setIdMethod = clazz.getMethod(methodName, id.getClass());
        setIdMethod.invoke(t, id);

        getRepo().findById(id).orElseThrow(() -> new ModelNotFoundException("ID NOT FOUND " + id));
        return getRepo().save(t);

    }

    @Override
    public List<T> findAll() {
        return getRepo().findAll();
    }

    @Override
    public T findById(ID id) {
        return getRepo().findById(id).orElseThrow(()-> new ModelNotFoundException("ID NOT FOUND: " + id));
    }

    @Override
    public void delete(ID id) {
        getRepo().deleteById(id);
    }
}