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
import { ClassroomInvitesComponent } from './classroom/classroom-invites/classroom-invites.component';


@NgModule({
  declarations: [ClassroomsComponent, ClassroomComponent, ClassroomProblemsComponent, ProblemSolvingComponent, ClassroomStudentsComponent, ClassroomInvitesComponent],
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
    MatButtonModule
  ]
})
export class ClassroomsModule { }
