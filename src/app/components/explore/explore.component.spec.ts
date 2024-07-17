import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ExploreComponent } from './explore.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(async () => {
    // Mock localStorage
    const mockLocalStorage = {
      getItem: (key: string) => {
        return '{"userData": [{"id": 1, "name": "John Doe", "workouts": [{"type": "Gym", "minutes": 60}]}, {"id": 2, "name": "Jane Smith", "workouts": [{"type": "Running", "minutes": 30}]}]}';
      },
      setItem: (key: string, value: string) => {},
      removeItem: (key: string) => {}
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ExploreComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    // Clear localStorage after each test
    localStorage.removeItem('userData');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userData from localStorage', () => {
    expect(component.userData).toEqual([
      { id: 1, name: 'John Doe', workouts: [{ type: 'Gym', minutes: 60 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Running', minutes: 30 }] },
    ]);
  });

});
