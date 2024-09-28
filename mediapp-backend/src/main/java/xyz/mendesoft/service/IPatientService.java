package xyz.mendesoft.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import xyz.mendesoft.model.Patient;



public interface IPatientService extends ICRUD<Patient, Integer> {

    Page<Patient> listPage(Pageable pageable);
}
