import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http: HttpClient) { }

  /**
   * Schedules a task to run at a specific Date.
   * @param scheduledDate The date and time when the task should run.
   */
  scheduleTask(scheduledStartDate: Date ,scheduledEndDate: Date,Time: String): void {
    const now = new Date();
    const delay = scheduledStartDate.getTime() - now.getTime();

    // If the scheduled date/time is in the past, execute immediately.
    if (delay <= 0) {
      this.executeTask();
    } else {
      // Use RxJS timer to schedule the task after the delay.
      timer(delay).subscribe(() => {
        this.executeTask();
      });
    }
  }

  /**
   * The method to be executed when the scheduled time is reached.
   */
  private executeTask(): void {
    // Replace with your actual backend URL and logic.
    const backendUrl = 'https://your-backend-url/api/search';
    this.http.get(backendUrl).subscribe({
      next: (response) => {
        // Process and store the response as needed.
        console.log('Data collected:', response);
        // For example, you might update an application state service or local storage.
      },
      error: (error) => {
        console.error('Error executing scheduled task:', error);
      }
    });
  }
}
