import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import moment from 'moment';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MaterialModule } from '../../material/material.module';
import { Patient } from '../../model/patient';
import { Medic } from '../../model/medic';
import { Specialty } from '../../model/specialty';
import { Exam } from '../../model/exam';
import { ConsultDetail } from '../../model/consultDetail';
import { PatientService } from '../../service/patient.service';
import { MedicService } from '../../service/medic.service';
import { SpecialtyService } from '../../service/specialty.service';
import { ExamService } from '../../service/exam.service';
import { ConsultService } from '../../service/consult.service';
import { Consult } from '../../model/consult';
import { ConsultListExamDTOI } from '../../dto/consultListExamDTOI';


@Component({
  selector: 'app-consult-wizard',
  standalone : true,
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css'],
  imports: [ MaterialModule, ReactiveFormsModule, NgFor, NgIf, FlexLayoutModule ]
})
export class ConsultWizardComponent implements OnInit{

  patients: Patient[];
  medics: Medic[];
  specialties: Specialty[];
  exams: Exam[];

  minDate: Date = new Date();
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  medicSelected: Medic;
  consultsArray: number[] = [];
  consultSelected: number;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      patient: [new FormControl(), Validators.required],
      specialty: [new FormControl(), Validators.required],
      exam: [new FormControl(), Validators.required],
      consultDate: [new FormControl(new Date()), Validators.required],
      diagnosis: new FormControl('', [Validators.required]),
      treatment: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = this._formBuilder.group({
    });
    
    this.loadInitialData();
  }

  loadInitialData(){
    this.patientService.findAll().subscribe(data => this.patients = data);
    this.medicService.findAll().subscribe(data => this.medics = data);
    this.specialtyService.findAll().subscribe(data => this.specialties = data);
    this.examService.findAll().subscribe(data => this.exams = data);

    for(let i = 1; i<= 100; i++){
      this.consultsArray.push(i);
    }
  }
  
  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  addExam() {
    if (this.firstFormGroup.value['exam'] != null) {
      this.examsSelected.push(this.firstFormGroup.value['exam']);
    } else {
      this._snackBar.open('Please select an exam', 'INFO', { duration: 2000 });
    }
  }

  selectMedic(m : Medic){
    this.medicSelected = m;
  }

  selectConsult(n : number){
    this.consultSelected = n;
  }

  nextManualStep(){
    if(this.consultSelected > 0){
      //sgte paso
      this.stepper.next();
    }else{
      this._snackBar.open('Please select a consult number', 'INFO', {duration: 2000,});
    }
  }

  
  get f() {
    return this.firstFormGroup.controls;
  }

  save() {
    const consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient'];
    consult.medic = this.medicSelected;
    consult.specialty = this.firstFormGroup.value['specialty'];
    consult.numConsult = `C${this.consultSelected}`;
    consult.details = this.details;
    consult.consultDate = moment(this.firstFormGroup.value['consultDate']).format('YYYY-MM-DDTHH:mm:ss');

    const dto: ConsultListExamDTOI = {
      consult: consult,
      lstExam: this.examsSelected
    };

    this.consultService.saveTransactional(dto).subscribe( ()=> {
      this._snackBar.open('CREATED!', 'INFO', {duration: 2000});

      setTimeout( ()=> {
        this.cleanControls();
      }, 2000);
    });    
  }

  cleanControls(){
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
    this.details = [];
    this.examsSelected = [];
    this.consultSelected = 0;
    this.medicSelected = null;
  }
}
