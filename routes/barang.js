const express = require('express');
const router = express.Router()
const BarangModel = require('../models/barangModel')

//get 
router.get('/', async (req, res) => {
  try {
    const barangs = await BarangModel.find()
    res.json(barangs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//get one
router.get('/:id', getBarang, (req, res) => {
  res.json(res.barang)
})

//create one
router.post('/', async (req, res) => {
const barangInput = new BarangModel({
  name: req.body.name,
  harga: req.body.harga,
  qty: req.body.qty,
})

try {
  const barangs = await barangInput.save()
  res.status(201).json(barangs)
} catch (error) {
  res.status(400).json({ message: error.message })
}
})

//updating one
router.patch('/:id', getBarang, async (req, res) => {
  if (req.body.name != null) {
    res.barang.name = req.body.name
  }

  if (req.body.harga != null) {
    res.barang.harga = req.body.harga
  }

  if (req.body.qty != null) {
    res.barang.qty = req.body.qty
  }

  try {
    const updateBarang = await res.barang.save()
    res.json(updateBarang)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Deleting one
router.delete('/:id', getBarang, async (req, res) => {
  try {
    await res.barang.remove()
    res.status(200).json({message: "success Delete!"})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

async function getBarang (req, res, next) {
  let barang
  try {
    barang = await BarangModel.findById(req.params.id)
    if (barang == null) {
      return res.status(404).json({ message:'cannot find Barang'})
    }
  } catch (error) {
    return res.status(500).json({ message:error.message })
  }

  res.barang = barang
  next();
}


module.exports = router