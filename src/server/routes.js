const express = require("express");
const db = require("./config/db");
const removeAccents = require("remove-accents");

const INTERNAL_SERVER_ERROR = 500;
const FILIAL = 1

const router = express.Router();

const normalizeText = (value) => value ? removeAccents(value.trim().replace(/ +(?= )/g, "").toUpperCase()) : "";
const getdtUltAlt = () => new Date().toISOString().slice(0, 19).replace('T', ' ');

router.get("/regioes", (req, res) => {
  try {
    db.query(`SELECT *
                FROM regiao
               WHERE filial = ${FILIAL}`,
      (err, results) => {
        if (err) throw err;
        res.json({
          data: results
        });
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
});

router.post("/regiao", (req, res) => {
  try {
    db.query(`SELECT MAX(CAST(cod_reg AS UNSIGNED)) + 1 AS cod_reg
                FROM regiao
               WHERE filial = ${FILIAL}`,
      (err, results) => {
        if (err) throw err;
        const codReg = results[0].cod_reg || 1;
        const desReg = normalizeText(req.body.des_reg);
        db.query(
          `INSERT
             INTO regiao (filial, cod_reg, des_reg, flo_3, dt_ult_alt)
           VALUES (${FILIAL}, ${codReg}, '${desReg}', 0, '${getdtUltAlt()}')`,
          (err, result) => {
            if (err) throw err;
            res.send("Registro inserido com sucesso!");
          }
        );
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
});

router.put("/regiao/:id", (req, res) => {
  try {
    const desReg = normalizeText(req.body.des_reg);
    db.query(
      `UPDATE regiao
          SET des_reg    = '${desReg}',
              dt_ult_alt = '${getdtUltAlt()}'
        WHERE filial     = ${FILIAL}
          AND cod_reg    = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send("Registro atualizado com sucesso!");
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
});

router.delete("/regiao/:id", (req, res) => {
  try {
    db.query(
      `DELETE
         FROM regiao
        WHERE filial  = ${FILIAL}
          AND cod_reg = ${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send("Registro excluído com sucesso!");
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(INTERNAL_SERVER_ERROR);
  }
});

module.exports = router;