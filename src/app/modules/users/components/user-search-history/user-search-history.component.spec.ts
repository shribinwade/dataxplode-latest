import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchHistoryComponent } from './user-search-history.component';

describe('UserSearchHistoryComponent', () => {
  let component: UserSearchHistoryComponent;
  let fixture: ComponentFixture<UserSearchHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSearchHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
