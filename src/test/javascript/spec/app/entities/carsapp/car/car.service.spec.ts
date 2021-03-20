import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService } from 'app/entities/carsapp/car/car.service';
import { ICar, Car } from 'app/shared/model/carsapp/car.model';

describe('Service Tests', () => {
  describe('Car Service', () => {
    let injector: TestBed;
    let service: CarService;
    let httpMock: HttpTestingController;
    let elemDefault: ICar;
    let expectedResult: ICar | ICar[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CarService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Car(0, 'AAAAAAA', 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of Car', () => {
        const returnedFromService = Object.assign(
          {
            make: 'BBBBBB',
            model: 'BBBBBB',
            price: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
