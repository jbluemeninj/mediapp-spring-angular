import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { ExamService } from '../../../service/exam.service';
import { Exam } from '../../../model/exam';

@Component({
  standalone: true,
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css'],
  imports:[MaterialModule, ReactiveFormsModule, NgIf, RouterLink]
})
export class ExamEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idExam': new FormControl(0),
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(3)])      
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    })

  }

  initForm() {
    if (this.isEdit) {

      this.examService.findById(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idExam': new FormControl(data.idExam),
          'name': new FormControl(data.nameExam, [Validators.required, Validators.minLength(3)]),
          'description': new FormControl(data.descriptionExam, [Validators.required, Validators.minLength(3)])          
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  operate() {
    if (this.form.invalid) { return; }

    let exam = new Exam();
    exam.idExam = this.form.value['idExam'];
    exam.nameExam = this.form.value['name'];
    exam.descriptionExam = this.form.value['description'];
    

    if (this.isEdit) {
      //UPDATE
      //PRACTICA COMUN
      this.examService.update(exam.idExam, exam).subscribe(() => {
        this.examService.findAll().subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!')
        });
      });
    } else {      
      //INSERT
      //PRACTICA IDEAL
      this.examService.save(exam).pipe(switchMap(()=>{        
        return this.examService.findAll();
      }))
      .subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange("CREATED!")
      });
    }
    this.router.navigate(['/pages/exam']);
  }


}
