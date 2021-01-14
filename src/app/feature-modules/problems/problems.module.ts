import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemsComponent } from './problems.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';



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
    ])
  ]
})
export class ProblemsModule { }
