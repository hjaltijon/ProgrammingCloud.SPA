import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsComponent } from './classrooms.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClassroomComponent } from './classroom/classroom.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ClassroomProblemsComponent } from './classroom/classroom-problems/classroom-problems.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProblemSolvingComponent } from './classroom/classroom-problems/problem-solving/problem-solving.component';
import { CodeEditorModule } from 'src/app/shared/code-editor/code-editor.module';
import { MatButtonModule } from '@angular/material/button';
import { ClassroomStudentsComponent } from './classroom/classroom-students/classroom-students.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomAddStudentModalComponent } from './classroom/classroom-students/classroom-add-student-modal/classroom-add-student-modal.component';
import { ClassroomAddProblemsModalComponent } from './classroom/classroom-problems/classroom-add-problems-modal/classroom-add-problems-modal.component';
import { MatListModule } from '@angular/material/list';
import { ClassroomsCreateClassroomModalComponent } from './classrooms-create-classroom-modal/classrooms-create-classroom-modal.component';


@NgModule({
  declarations: [ClassroomsComponent, ClassroomComponent, ClassroomProblemsComponent, ProblemSolvingComponent, ClassroomStudentsComponent, ClassroomAddStudentModalComponent, ClassroomAddProblemsModalComponent, ClassroomsCreateClassroomModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'classrooms', 
        component: ClassroomsComponent,
        canActivate: [AuthGuard]
        // ,
        // children: [
        //   {path: 'reset-password', component: LoginComponent},
        // ]
      },
      {
        path: 'classrooms/:classroomId',
        component: ClassroomComponent, 
        canActivate: [AuthGuard]
      },
      {
        path: 'classrooms/:classroomId/problems/:problemId',
        component: ProblemSolvingComponent, 
        canActivate: [AuthGuard]
      }
    ]),
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    DragDropModule,
    CodeEditorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule
  ]
})
export class ClassroomsModule { }
