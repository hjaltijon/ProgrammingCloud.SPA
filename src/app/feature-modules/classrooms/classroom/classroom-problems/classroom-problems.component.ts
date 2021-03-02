import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ProblemApiService } from 'src/app/core/services-api/problem-api.service';
import { ActivatedRoute } from '@angular/router';
import { Problem } from 'src/app/models/api/problem/problem';

@Component({
  selector: 'app-classroom-problems',
  templateUrl: './classroom-problems.component.html',
  styleUrls: ['./classroom-problems.component.scss']
})
export class ClassroomProblemsComponent implements OnInit {

  constructor(
    private _problemApiService: ProblemApiService,
    private _route: ActivatedRoute
    ) { }

  problems: Problem[];
  loadingData: boolean = true;
  classroomId: number = null;
  async ngOnInit(): Promise<void> {
    this.loadingData = true;
    let classroomId: number = parseInt(this._route.snapshot.paramMap.get('classroomId'));
    this.classroomId = classroomId;
    this.problems = await this._problemApiService.getClassroomProblems(classroomId);
    this.loadingData = false;
  }



  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    moveItemInArray(this.problems, event.previousIndex, event.currentIndex);
    console.log(event);
    console.log(this.movies);
  }

}
