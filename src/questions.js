export const questions = [
  {
    question: "Sláðu inn orð til að greina. Ef hægt er að fallbeygja orðið þarf það að vera í eintölu og nefnifalli ef kostur er.",
    type: "input",
    next: 1,
    tooltips: {
      "fallbeygja": "Við biðjum um orðið í nefnifalli eintölu til að auðvelda greiningu.",
      "nefnifalli": "Nefnifall er grunnfall nafnorða og svarar spurningunni 'hver?' eða 'hvað?'."
    }
  },
  {
    question: "Er hægt að fallbeygja orðið?",
    type: "yesno",
    onYes: 2,
    onNo: 13,
    tooltips: {
      "fallbeygja": "Fallbeyging er beyging orða í föllum (nefnifalli, þolfalli, þágufalli og eignarfalli). Dæmi: köttur, kött, ketti, kattar",
      "fallorð": "Fallorð eru orð sem hægt er að fallbeygja, t.d. nafnorð, lýsingarorð, og fornöfn."
    }
  },
  {
    question: "Flott! Orðið er fallorð. Viltu greina það í undirflokka?",
    type: "yesno",
    onYes: 3,
    onNo: () => "fallorð",
    tooltips: {
     "fallorð": "Fallorð eru orð sem hægt er að fallbeygja. Þau skiptast í nokkra undirflokka sem hafa mismunandi einkenni. Undirflokkar fallorða eru t.d. nafnorð, lýsingarorð, og töluorð.",
    }
  },
  {
    question: "Tekur orðið við greini?",
    type: "yesno",
    onYes: () => "nafnorð",
    onNo: 4,
    tooltips: {
      "greini": "Greinir er viðskeyti sem bætist við nafnorð til að gefa til kynna ákveðni, Dæmi: 'hundur' verður 'hundurinn'."
    }
  },
  {
    question: "Stigbreytist orðið?",
    type: "yesno",
    onYes: () => "lýsingarorð",
    onNo: 5,
    tooltips: {
      "stigbreytist": "Stigbreyting er ferli þar sem lýsingarorð breytist eftir stigum, t.d. 'fallegur, fallegri, fallegastubeyging lýsingarorða og atviksorða í stigum. Dæmi: 'breiður, breiðari, breiðastur', 'góðlegur, góðlegri, góðlegastur'r'."
    }
  },
  {
    question: "Er orðið töluorð?",
    type: "yesno",
    onYes: () => "töluorð",
    onNo: 6,
    tooltips: {
      "toluorð": "Töluorð eru orð sem tákna tölur eða magn. Dæmi: 'einn', 'tveir', 'þrír'."
    }
  },
  {
    question: "Er orðið greinirinn hinn/hin/hið sem stendur við hlið nafnorðs? (Dæmi: Hin góða kona).",
    type: "yesno",
    onYes: () => "greinir",
    onNo: 7,
    tooltips: {
      "greinir": "sérstakur orðflokkur, á íslensku annað hvort laus greinir ('hinn') eða viðskeyttur: 'dalur-inn'"
    }
  },
  {
    question: "Flott! Orðið er fornafn. Viltu greina það í undirflokka?",
    type: "yesno",
    onYes: 8,
    onNo: () => "fornafn",
    tooltips: {
      "fornafn": "Fornafn er orðflokkur með orðum sem beygjast í kyni, tölu og falli. Dæmi: ég, þú, hann, hún, þessi, sá, hver, hvor, nokkur, annar, ýmis og sumir. Fornöfn skiptast í nokkra undirflokka eftir hlutverki þeirra í setningum. Dæmi: persónufornöfn, eignarfornöfn, o.s.frv."
    }
  },
  {
    question: "Er orðið Ég, þú, hann, hún, hán eða það?",
    type: "yesno",
    onYes: () => "persónufornafn",
    onNo: 9,
    tooltips: {
      "han": "Kynhlutlaust persónufornafn í 3. persónu. Notað um fólk sem skilgreinir sig hvorki sem karlkyns né kvenkyns og kýs að nota þetta fornafn. Lýsingarorð sem vísa til kvársins eða stálpsins sem um ræðir eru í hvorugkyni. Dæmi: Regn er stálp og hán er rauðhært."
    }
  },
  
  {
    question: "Vísar orðið til eignar á einhverjum hlut?",
    type: "yesno",
    onYes: () => "eignarfornafn",
    onNo: 10,
    tooltips: {
      "eignarfornafn": "Eignarfornöfn sýna eignarhald, t.d. 'minn', 'þinn', 'sinn'. Dæmi: 'mín bók', 'þinn bíll'."
    }
  },
  {
    question: "Er orðið afturbeygða fornafnið sig (sér/sín)?",
    type: "yesno",
    onYes: () => "afturbeygt fornafn",
    onNo: 11,
    tooltips: {
      "afturbeygt fornafn": "Afturbeygt fornafn vísar til sömu persónu og frumlag setningarinnar. Dæmi: 'Hann skemmti sér'."
    }
  },
  {
    question: "Er orðið sá, þessi eða hinn?",
    type: "yesno",
    onYes: () => "ábendingarfornafn",
    onNo: 12,
    tooltips: {
      "abendingarfornafn": "Ábendingarfornöfn eru notuð til að benda á ákveðna hluti eða fyrirbæri."
    }
  },
  {
    question: "Er orðið hver, hvor, hvaða eða hvílíkur?",
    type: "yesno",
    onYes: () => "spurnarfornafn",
    onNo: () => "óákveðið fornafn",
    tooltips: {
      "spurnarfornafn": "Spurnarfornöfn eru notuð til að spyrja spurninga.",
      "oakvedid fornafn": "Flest óákveðin fornöfn eru talin í þessari vísu: Annar, fáeinir, enginn, neinn, ýmis, báðir, sérhver, hvorugur, sumur, hver og einn, hvor og nokkur, einhver."
    }
  },
  {
    question: "Er hægt að setja orðið í þátíð?",
    type: "yesno",
    onYes: () => "sagnorð",
    onNo: 14,
    tooltips: {
      "sagnorð": "Sagnorð eru orð sem beygist í persónu, tölu og hætti og lýsir oft verknaði. Dæmi: ganga, horfa og breyta.",
      "smaorð": "Smáorð eru orð sem beygjast ekki."
      
    }
  },
  {
    question: "Flott! Orðið er smáorð. Viltu greina það í undirflokka?",
    type: "yesno",
    onYes: 15,
    onNo: () => "smáorð",
    tooltips: {
      "smaorð": "Smáorð eru orð sem beygjast ekki."
    }
  },
  {
    question: "Stýrir orðið falli? Það er að segja, er fallorð í þolfalli, þágufalli eða eignarfalli á eftir orðinu?",
    type: "yesno",
    onYes: () => "forsetning",
    onNo: 16,
    tooltips: {
      "forsetning": "óbeygjanlegt smáorð sem stýrir falli, Dæmi: á, í, frá, fyrir, með, milli, um. Það er alltaf fallorð í aukafalli (ekki nefnifalli) á eftir forsetningum."
    }
  },
  {
    question: "Tengir orðið saman tvö orð eða tvær setningar?",
    type: "yesno",
    onYes: () => "samtenging",
    onNo: 17,
    tooltips: {
      "samtenging": "Samtengingar eru orðflokkur óbeygjanlegra orða sem eru notuð til að tengja saman setningarliði eða setningar. Dæmi: og, en."
    }
  },
  {
    question: "Er orðið upphrópun, eins og æ! eða ó!?",
    type: "yesno",
    onYes: () => "upphrópun",
    onNo: 18,
    tooltips: {
      "upphropun": "Upphrópanir eru orð sem tjá tilfinningar eða viðbrögð, oft notuð ein og sér."
    }
  },
  {
    question: "Er orðið AÐ á undan sagnorði?",
    type: "yesno",
    onYes: () => "nafnháttarmerki",
    onNo: () => "atviksorð",
    tooltips: {
      "nafnhattarmerki": "Nafnháttarmerki er orðflokkur sem aðeins eitt orð tilheyrir: 'að'. Nhm er oft á undan sögn í nafnhætti í setningum. Dæmi: Það er gaman að læra.",
      "atviksorð": "Atviksorð eru fjölbreytilegur flokkur orða sem tákna hátt, stað, tíma, áherslu o.fl..Dæmi: 'vel', 'inni', 'stundum', 'geysilega'"
    }
  }
];