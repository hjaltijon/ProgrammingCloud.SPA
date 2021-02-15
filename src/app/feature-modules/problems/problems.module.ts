import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsComponent } from './problems.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProblemComponent } from './problem/problem.component';
import { CodeEditorModule } from 'src/app/shared/code-editor/code-editor.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [ProblemsComponent, ProblemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'problems', 
        component: ProblemsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'problems/:problemId',
        component: ProblemComponent,
        canActivate: [AuthGuard]
      }
    ]),
    MatProgressBarModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CodeEditorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class ProblemsModule { }
