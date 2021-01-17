import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsComponent } from './problems.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [ProblemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'problems', 
        component: ProblemsComponent,
        canActivate: [AuthGuard]
      }
    ]),
    MatProgressBarModule,
    MatTableModule
  ]
})
export class ProblemsModule { }
