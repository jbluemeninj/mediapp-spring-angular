import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';
import { switchMap } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { Medic } from '../../model/medic';
import { MedicService } from '../../service/medic.service';

@Component({
  standalone: true,
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css'],
  imports: [MaterialModule]
})
export class MedicComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'cmp',
    'actions',
  ];
  dataSource: MatTableDataSource<Medic>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /*constructor(
    private medicService: MedicService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }*/

  private medicService = inject(MedicService);

  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.medicService.getMedicChange().subscribe(data => this.createTable(data));
    this.medicService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));

    this.medicService.findAll().subscribe((data) => {
      this.createTable(data);
    });
  }

  createTable(medics: Medic[]) {
    this.dataSource = new MatTableDataSource(medics);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  openDialog(medic?: Medic) {
    this._dialog.open(MedicDialogComponent, {
      width: '350px',
      data: medic,
      disableClose: true
    });
  }

  delete(id: number) {
    this.medicService.delete(id)
      .pipe(switchMap( ()=> this.medicService.findAll() ))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('DELETED!');
      });
  }
}
