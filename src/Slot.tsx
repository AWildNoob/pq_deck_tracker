/*
enum Slot {
  TL = 2**1,  // Face
  TM = 2**2,  // Hat
  TR = 2**3,  //
  ML = 2**4,  //
  M = 2**5,   // Shirt
  MR = 2**6,  // Coat
  BL = 2**7,  // Glove/hand
  BM = 2**8,  // Pants
  BR = 2**9,  // Shoe/foot
  W = 2**10,  // Weapon
  OH = 2**11, // Offhand
  ROW_T = TL | TM | TR,
  ROW_M = ML | M | MR,
  ROW_B = BL | BM | BR,
  EQUIP = ROW_T | ROW_M | ROW_B,
  TRINKET = EQUIP | 2**12 // Trinket-only slot, not yet obtained
}*/
enum Slot {
  TL,
  TM,
  TR,
  ML,
  M,
  MR,
  BL,
  BM,
  BR,
  W,
  OH,
  TRINKET
}
export default Slot;