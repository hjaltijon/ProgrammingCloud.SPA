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


@NgModule({
  declarations: [ClassroomsComponent, ClassroomComponent, ClassroomProblemsComponent],
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
      }
    ]),
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    DragDropModule
  ]
})
export class ClassroomsModule { }
