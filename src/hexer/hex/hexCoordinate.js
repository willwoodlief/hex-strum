class  HexCoordinate {
    constructor(x, y,z) {
        if (typeof x === 'object' && x instanceof HexCoordinate ) {
            let other = x;
            this.mapY = other.mapY;
            this.mapX = other.mapX;
            this.hexA = other.hexA;
            this.hexB = other.hexB;
            this.hexC = other.hexC;
        }
        else if (typeof z === 'undefined' || z === null) { //passed 2 coordinates
            this.mapY = y;
            this.mapX = x;
            {
               
                let row = y;
                let col = x;

                if ( (col < 0 ) || ( col >=   HexStrum.setup.boardWidth )  )
                    throw new Error("out of range,x,for hex map cell");

                if ( (row < 0 ) || ( row >= HexStrum.setup.boardHeight )  )
                    throw new Error("out of range,y,for hex map cell");
                
                let a,b,c;
                if ((row % 2) === 1) //odd
                {
                    //calc the number of odd rows this is from the start (0)
                    a = Math.floor(row/2) + 1;
                    c = a - 1;
                    b = row;

                }
                else
                {
                    a= Math.floor(row/2);
                    c = a;
                    b = row;

                }

                a += col;
                c -= col;

                this.hexA = a;
                this.hexB = b;
                this.hexC = c;
            }

        } else { //passed 3d coordinates
            this.hexA = x;
            this.hexB = y;
            this.hexC = z;

            {
                let arrayX,arrayY;
                let a = x,b=y,c=z;
                //filter for off bounds for x
                let x_start = Math.floor((b + 1)/2);
                if (a - x_start < 0 ) { throw new Error("Convert abc to xy converted to less than zero"); }
                //it's to the left

                arrayY = b;

                if (a > c)  arrayX = Math.floor(((a - c) + (arrayY & 1)) / 2);
                if (c > a)  arrayX = Math.floor(((c - a ) - ((arrayY +1) & 1)) /2) ;

                if (a === c)  { arrayX = 0; }// hexA-hexC == 0

                if ( (arrayY  % 2) ===  1) {arrayX--;}

                if ( (arrayX < 0 ) || ( arrayX >= HexStrum.setup.boardWidth )) {
                    throw new Error("Convert to xy from abc converted to an illegal x value");
                }


                if ( (arrayY < 0 ) || ( arrayY >= HexStrum.setup.boardHeight )  ) {
                    throw new Error("Convert to xy from abc converted to an illegal y value");
                }


                this.mapY = arrayY;
                this.mapX = arrayX;
            }
        }


        this.hash_value = `x=${this.hexA},y=${this.hexB},z=${this.hexC}`;

    }

    /**
     * @param {HexCoordinate} coordinates
     * @returns {number}
     */
    distance(coordinates) {
        let a1 = this.hexA;
        let a2 = coordinates.hexA;
        let b1 = this.hexB;
        let b2 = coordinates.hexB;
        let c1 = this.hexC;
        let c2 = coordinates.hexC;
        let distance = Math.abs(a2 - a1) + Math.abs(b2 - b1) + Math.abs(c2 - c1);
        distance /= 2;
        return Math.floor(distance);
    }
}

/*

void Map::convertToXY(int a, int b, int c, int& arrayX, int& arrayY)
{
	//filter for off bounds for x
	int xstart = (b + 1)/2;
	if (a - xstart < 0 ) _DIS("Convert to xy converted to an illegal x value");
							//its to the left

	arrayY = b;

	if (a > c)  arrayX = ((a - c) + (arrayY & 1)) / 2;
	if (c > a)  arrayX = ((c - a ) - ((arrayY +1) & 1)) /2 ;

	if (a == c)  arrayX = 0; // hexA-hexC == 0

	if ( arrayY & 1) arrayX--;

	if ( (arrayX < 0 ) || ( arrayX >= HexStrum.setup.boardWidth )  )
			_DIS("Convert to xy converted to an illegal x value");

	if ( (arrayY < 0 ) || ( arrayY >= HexStrum.setup.boardHeight )  )
		_DIS("Convert to xy converted to an illegal y value");

}


void Map::convertToABC(int col, int row, int& a, int& b, int& c)
{
	if ( (col < 0 ) || ( col >= HexStrum.setup.boardWidth )  )
		_DIS("out of range,x,for hex map cell");

	if ( (row < 0 ) || ( row >= HexStrum.setup.boardHeight )  )
		_DIS("out of range,y,for hex map cell");

	if (row & 1) //odd
	{
		//calc the number of odd rows this is from the start (0)
		a = row/2 + 1;
		c = a - 1;
		b = row;

	}
	else
	{
		a= row/2;
		c = a;
		b = row;

	}

	a += col;
	c -= col;

}

// abs(x1 - x2) + abs(y1 - y2) works as well ?
int	  Map::Distance(HexCell* hex1, HexCell* hex2)
{
	int a1 = hex1->a;
	int a2 = hex2->a;
	int b1 = hex1->b;
	int b2 = hex2->b;
	int c1 = hex1->c;
	int c2 = hex2->c;
	int distance = abs(a2 - a1) + abs(b2 - b1) + abs(c2 - c1);
	distance /= 2;
	return distance;

}
 */


