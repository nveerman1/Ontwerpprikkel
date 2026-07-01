import { CategoryItem } from "@/types/generator";

export const productForms: CategoryItem[] = [
  {
    id: "pf-modulair-opbergsysteem",
    text: "modulair opbergsysteem",
    directions: ["schoolEnvironment", "makerSpace", "designProductionTrade"],
    typeCompatibility: ["product", "technicalDesign"],
    constraintModes: ["fastPrototype", "recycledMaterial", "foldable"],
  },
  {
    id: "pf-schermvrij-planning",
    text: "schermvrij planningsbord",
    directions: ["schoolEnvironment", "digitalMediaEntertainment"],
    typeCompatibility: ["product", "system"],
    constraintModes: ["withoutApp", "withoutPower", "mechanical"],
  },
  {
    id: "pf-mechanisch-sorteren",
    text: "mechanisch sorteersysteem",
    directions: ["makerSpace", "designProductionTrade"],
    typeCompatibility: ["technicalDesign", "system"],
    constraintModes: ["mechanical", "recycledMaterial", "fastPrototype"],
  },
  {
    id: "pf-rustmeubel",
    text: "compact rustmeubel",
    directions: ["schoolEnvironment", "humanHealth", "livingWorkTraffic"],
    typeCompatibility: ["space", "product"],
    constraintModes: ["foldable", "fastPrototype"],
  },
  {
    id: "pf-fietsparkeerhulp",
    text: "fietsparkeerhulp",
    directions: ["bikeStorage", "livingWorkTraffic"],
    typeCompatibility: ["product", "technicalDesign"],
    constraintModes: ["scaleModelSafe", "mechanical", "maxTenEuro"],
  },
  {
    id: "pf-mini-kas",
    text: "mini-kas voor in de klas",
    directions: ["schoolEnvironment", "foodNature", "highTechScience"],
    typeCompatibility: ["product", "researchIdea"],
    constraintModes: ["fastPrototype", "recycledMaterial", "scaleModelSafe"],
  },
  {
    id: "pf-veiligheidsindicator",
    text: "veiligheidsindicator",
    directions: ["humanHealth", "energyWaterSafety", "livingWorkTraffic"],
    typeCompatibility: ["technicalDesign", "system"],
    constraintModes: ["mechanical", "withoutApp", "waterResistant"],
  },
  {
    id: "pf-watercoach",
    text: "waterbesparende douchecoach",
    directions: ["energyWaterSafety", "livingWorkTraffic"],
    typeCompatibility: ["product", "researchIdea"],
    constraintModes: ["withoutApp", "withoutPower", "waterResistant"],
  },
  {
    id: "pf-festivalmodule",
    text: "herbruikbare festivalmodule",
    directions: ["designProductionTrade", "digitalMediaEntertainment"],
    typeCompatibility: ["space", "system"],
    constraintModes: ["recycledMaterial", "foldable"],
  },
  {
    id: "pf-bewegingschallenge",
    text: "sensorloze bewegingschallenge",
    directions: ["humanHealth", "schoolEnvironment"],
    typeCompatibility: ["system", "researchIdea"],
    constraintModes: ["withoutApp", "withoutPower", "mechanical"],
  },
];

export const audiences: CategoryItem[] = [
  {
    id: "au-brugklassers",
    text: "brugklassers",
    directions: ["schoolEnvironment", "breakAndCafeteria", "bikeStorage"],
  },
  {
    id: "au-docenten",
    text: "docenten in een druk lokaal",
    directions: ["schoolEnvironment", "classroomLayout"],
  },
  {
    id: "au-ouderen",
    text: "ouderen die zelfstandig wonen",
    directions: ["humanHealth", "livingWorkTraffic"],
  },
  {
    id: "au-sporters",
    text: "sporters bij een vereniging",
    directions: ["humanHealth"],
  },
  {
    id: "au-forenzen",
    text: "forenzen op een druk station",
    directions: ["livingWorkTraffic"],
  },
  {
    id: "au-makerspace",
    text: "leerlingen in de MakerSpace",
    directions: ["makerSpace", "designProductionTrade", "highTechScience"],
  },
  {
    id: "au-gezinnen",
    text: "gezinnen thuis",
    directions: ["livingWorkTraffic", "energyWaterSafety", "foodNature"],
  },
  {
    id: "au-festival",
    text: "bezoekers van een festival",
    directions: ["digitalMediaEntertainment", "designProductionTrade"],
  },
  {
    id: "au-basisschool",
    text: "basisschoolleerlingen",
    directions: ["schoolEnvironment", "humanHealth"],
  },
  {
    id: "au-buurt",
    text: "buurtbewoners bij wateroverlast",
    directions: ["energyWaterSafety", "livingWorkTraffic"],
  },
];

export const problems: CategoryItem[] = [
  {
    id: "pr-vergeten",
    text: "het vergeten van spullen",
    directions: ["schoolEnvironment", "classroomLayout"],
  },
  {
    id: "pr-restafval",
    text: "te veel restafval in de pauze",
    directions: ["breakAndCafeteria", "foodNature", "designProductionTrade"],
  },
  {
    id: "pr-drukte",
    text: "drukte en botsingen",
    directions: ["bikeStorage", "livingWorkTraffic"],
  },
  {
    id: "pr-beweging",
    text: "te weinig beweging op een dag",
    directions: ["humanHealth"],
  },
  {
    id: "pr-verspilling",
    text: "water- en energieverspilling",
    directions: ["energyWaterSafety", "foodNature", "livingWorkTraffic"],
  },
  {
    id: "pr-routes",
    text: "onduidelijke looproutes",
    directions: ["schoolEnvironment", "livingWorkTraffic"],
  },
  {
    id: "pr-voedsel",
    text: "voedselverspilling",
    directions: ["foodNature", "schoolEnvironment", "designProductionTrade"],
  },
  {
    id: "pr-overprikkeling",
    text: "lawaai en overprikkeling",
    directions: ["schoolEnvironment", "humanHealth"],
  },
  {
    id: "pr-onderdelen",
    text: "het kwijtraken van kleine onderdelen",
    directions: ["makerSpace", "designProductionTrade"],
  },
  {
    id: "pr-zicht",
    text: "onveiligheid bij slecht zicht",
    directions: ["livingWorkTraffic", "energyWaterSafety", "humanHealth"],
  },
];

export const markets: CategoryItem[] = [
  {
    id: "ma-aula",
    text: "de aula",
    directions: ["schoolEnvironment", "breakAndCafeteria"],
  },
  {
    id: "ma-fietsenstalling",
    text: "de fietsenstalling",
    directions: ["bikeStorage", "livingWorkTraffic", "schoolEnvironment"],
  },
  {
    id: "ma-verzorgingshuis",
    text: "een verzorgingshuis",
    directions: ["humanHealth"],
  },
  {
    id: "ma-sportclub",
    text: "een sportclub",
    directions: ["humanHealth"],
  },
  {
    id: "ma-station",
    text: "een station",
    directions: ["livingWorkTraffic"],
  },
  {
    id: "ma-makerspace",
    text: "de MakerSpace",
    directions: ["makerSpace", "designProductionTrade", "highTechScience"],
  },
  {
    id: "ma-badkamer",
    text: "een kleine badkamer",
    directions: ["livingWorkTraffic", "energyWaterSafety"],
  },
  {
    id: "ma-festival",
    text: "een festivalterrein",
    directions: ["digitalMediaEntertainment", "designProductionTrade"],
  },
  {
    id: "ma-schoolplein",
    text: "een schoolplein",
    directions: [
      "schoolEnvironment",
      "humanHealth",
      "livingWorkTraffic",
      "foodNature",
    ],
  },
  {
    id: "ma-wateroverlast",
    text: "een buurt met wateroverlast",
    directions: ["energyWaterSafety", "livingWorkTraffic"],
  },
];

export const constraints: CategoryItem[] = [
  {
    id: "co-zonder-app",
    text: "zonder app werkt",
    directions: ["schoolEnvironment", "digitalMediaEntertainment"],
    constraintModes: ["withoutApp"],
  },
  {
    id: "co-lesuur",
    text: "binnen één lesuur te prototypen is",
    directions: ["schoolEnvironment", "makerSpace"],
    constraintModes: ["fastPrototype"],
  },
  {
    id: "co-restmateriaal",
    text: "gemaakt wordt van restmateriaal",
    directions: ["makerSpace", "designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "co-zonder-stroom",
    text: "zonder stroom werkt",
    directions: ["energyWaterSafety", "digitalMediaEntertainment"],
    constraintModes: ["withoutPower"],
  },
  {
    id: "co-budget",
    text: "maximaal tien euro per gebruiker kost",
    directions: ["schoolEnvironment", "designProductionTrade"],
    constraintModes: ["maxTenEuro"],
  },
  {
    id: "co-inklapbaar",
    text: "inklapbaar en verplaatsbaar is",
    directions: ["livingWorkTraffic", "schoolEnvironment"],
    constraintModes: ["foldable"],
  },
  {
    id: "co-waterbestendig",
    text: "waterbestendig is",
    directions: ["energyWaterSafety", "livingWorkTraffic", "humanHealth"],
    constraintModes: ["waterResistant"],
  },
  {
    id: "co-aanpasbaar",
    text: "door leerlingen zelf aangepast kan worden",
    directions: ["schoolEnvironment", "makerSpace"],
    constraintModes: ["fastPrototype", "recycledMaterial"],
  },
  {
    id: "co-lowtech",
    text: "mechanisch en low-tech blijft",
    directions: ["makerSpace", "designProductionTrade", "schoolEnvironment"],
    constraintModes: ["mechanical", "withoutPower"],
  },
  {
    id: "co-schaalmodel",
    text: "veilig getest kan worden met een schaalmodel",
    directions: ["makerSpace", "highTechScience", "schoolEnvironment"],
    constraintModes: ["scaleModelSafe"],
  },
];

export const technologies: CategoryItem[] = [
  {
    id: "te-mechanisme",
    text: "een eenvoudig mechanisme",
    directions: ["makerSpace", "designProductionTrade"],
    constraintModes: ["mechanical"],
  },
  {
    id: "te-kleurcode",
    text: "kleurcodering",
    directions: [
      "schoolEnvironment",
      "livingWorkTraffic",
      "digitalMediaEntertainment",
    ],
    constraintModes: ["withoutApp", "fastPrototype"],
  },
  {
    id: "te-hergebruik",
    text: "hergebruikmateriaal",
    directions: ["designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "te-sensor",
    text: "een sensor of meetprincipe",
    directions: ["highTechScience", "humanHealth"],
  },
  {
    id: "te-modulair",
    text: "modulaire onderdelen",
    directions: ["makerSpace", "livingWorkTraffic", "designProductionTrade"],
    constraintModes: ["foldable"],
  },
  {
    id: "te-signaal",
    text: "een low-tech signaal",
    directions: ["digitalMediaEntertainment", "schoolEnvironment"],
    constraintModes: ["withoutPower", "mechanical"],
  },
  {
    id: "te-zonne",
    text: "zonne-energie",
    directions: ["energyWaterSafety"],
  },
  {
    id: "te-schaal",
    text: "een schaalmodeltest",
    directions: ["makerSpace", "highTechScience", "schoolEnvironment"],
    constraintModes: ["scaleModelSafe"],
  },
];

export const trends: CategoryItem[] = [
  {
    id: "tr-schermvrij",
    text: "schermvrij werken",
    directions: ["digitalMediaEntertainment", "schoolEnvironment"],
    constraintModes: ["withoutApp"],
  },
  {
    id: "tr-circulair",
    text: "circulair materiaalgebruik",
    directions: ["designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "tr-gezond",
    text: "gezond gedrag",
    directions: ["humanHealth"],
  },
  {
    id: "tr-deel",
    text: "deelgebruik",
    directions: ["designProductionTrade", "livingWorkTraffic"],
  },
  {
    id: "tr-klimaat",
    text: "klimaatadaptatie",
    directions: ["energyWaterSafety", "livingWorkTraffic"],
  },
  {
    id: "tr-gamification",
    text: "gamification",
    directions: [
      "schoolEnvironment",
      "humanHealth",
      "digitalMediaEntertainment",
    ],
  },
  {
    id: "tr-personalisatie",
    text: "personalisatie",
    directions: ["schoolEnvironment", "humanHealth"],
  },
];
