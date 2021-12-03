type Move = [Piece, Piece];
type Square = Piece | null;
type Position = Square[];

enum Piece {
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_PAWN,
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_PAWN,
}

const emptyRank = <Square[]>new Array(8).fill(null);
const whitePawnRank = <Square[]>new Array(8).fill(Piece.WHITE_PAWN);
const blackPawnRank = <Square[]>new Array(8).fill(Piece.BLACK_PAWN);

const startPosition: Position = [
  Piece.BLACK_ROOK,
  Piece.BLACK_KNIGHT,
  Piece.BLACK_BISHOP,
  Piece.BLACK_QUEEN,
  Piece.BLACK_KING,
  Piece.BLACK_BISHOP,
  Piece.BLACK_KNIGHT,
  Piece.BLACK_ROOK,
  ...blackPawnRank,
  ...emptyRank,
  ...emptyRank,
  ...emptyRank,
  ...emptyRank,
  ...whitePawnRank,
  Piece.WHITE_ROOK,
  Piece.WHITE_KNIGHT,
  Piece.WHITE_BISHOP,
  Piece.WHITE_QUEEN,
  Piece.WHITE_KING,
  Piece.WHITE_BISHOP,
  Piece.WHITE_KNIGHT,
  Piece.WHITE_ROOK,
];

export { Move, Piece, Position, Square, startPosition };
