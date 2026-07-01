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
    directions: ["sustainability", "makerSpace", "designProductionTrade"],
    typeCompatibility: ["technicalDesign", "system"],
    constraintModes: ["mechanical", "recycledMaterial", "fastPrototype"],
  },
  {
    id: "pf-rustmeubel",
    text: "compact rustmeubel",
    directions: ["schoolEnvironment", "healthcare", "housingAndSpace"],
    typeCompatibility: ["space", "product"],
    constraintModes: ["foldable", "fastPrototype"],
  },
  {
    id: "pf-fietsparkeerhulp",
    text: "fietsparkeerhulp",
    directions: ["bikeStorage", "mobility", "livingWorkTraffic"],
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
    directions: ["healthcare", "energyWaterSafety", "mobility"],
    typeCompatibility: ["technicalDesign", "system"],
    constraintModes: ["mechanical", "withoutApp", "waterResistant"],
  },
  {
    id: "pf-watercoach",
    text: "waterbesparende douchecoach",
    directions: ["sustainability", "housingAndSpace", "energyWaterSafety"],
    typeCompatibility: ["product", "researchIdea"],
    constraintModes: ["withoutApp", "withoutPower", "waterResistant"],
  },
  {
    id: "pf-festivalmodule",
    text: "herbruikbare festivalmodule",
    directions: ["sustainability", "sports", "designProductionTrade"],
    typeCompatibility: ["space", "system"],
    constraintModes: ["recycledMaterial", "foldable"],
  },
  {
    id: "pf-bewegingschallenge",
    text: "sensorloze bewegingschallenge",
    directions: ["sports", "humanHealth", "schoolEnvironment"],
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
    directions: ["healthcare", "housingAndSpace", "humanHealth"],
  },
  {
    id: "au-sporters",
    text: "sporters bij een vereniging",
    directions: ["sports", "humanHealth"],
  },
  {
    id: "au-forenzen",
    text: "forenzen op een druk station",
    directions: ["mobility", "livingWorkTraffic"],
  },
  {
    id: "au-makerspace",
    text: "leerlingen in de MakerSpace",
    directions: ["makerSpace", "designProductionTrade", "highTechScience"],
  },
  {
    id: "au-gezinnen",
    text: "gezinnen thuis",
    directions: ["housingAndSpace", "sustainability", "energyWaterSafety"],
  },
  {
    id: "au-festival",
    text: "bezoekers van een festival",
    directions: ["sports", "sustainability", "digitalMediaEntertainment"],
  },
  {
    id: "au-basisschool",
    text: "basisschoolleerlingen",
    directions: ["schoolEnvironment", "humanHealth"],
  },
  {
    id: "au-buurt",
    text: "buurtbewoners bij wateroverlast",
    directions: ["sustainability", "energyWaterSafety", "housingAndSpace"],
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
    directions: ["sustainability", "breakAndCafeteria", "foodNature"],
  },
  {
    id: "pr-drukte",
    text: "drukte en botsingen",
    directions: ["mobility", "bikeStorage", "livingWorkTraffic"],
  },
  {
    id: "pr-beweging",
    text: "te weinig beweging op een dag",
    directions: ["sports", "healthcare", "humanHealth"],
  },
  {
    id: "pr-verspilling",
    text: "water- en energieverspilling",
    directions: ["sustainability", "energyWaterSafety", "housingAndSpace"],
  },
  {
    id: "pr-routes",
    text: "onduidelijke looproutes",
    directions: ["schoolEnvironment", "mobility", "livingWorkTraffic"],
  },
  {
    id: "pr-voedsel",
    text: "voedselverspilling",
    directions: ["sustainability", "foodNature", "schoolEnvironment"],
  },
  {
    id: "pr-overprikkeling",
    text: "lawaai en overprikkeling",
    directions: ["schoolEnvironment", "healthcare", "humanHealth"],
  },
  {
    id: "pr-onderdelen",
    text: "het kwijtraken van kleine onderdelen",
    directions: ["makerSpace", "designProductionTrade"],
  },
  {
    id: "pr-zicht",
    text: "onveiligheid bij slecht zicht",
    directions: ["mobility", "energyWaterSafety", "healthcare"],
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
    directions: ["bikeStorage", "mobility", "schoolEnvironment"],
  },
  {
    id: "ma-verzorgingshuis",
    text: "een verzorgingshuis",
    directions: ["healthcare", "humanHealth"],
  },
  {
    id: "ma-sportclub",
    text: "een sportclub",
    directions: ["sports", "humanHealth"],
  },
  {
    id: "ma-station",
    text: "een station",
    directions: ["mobility", "livingWorkTraffic"],
  },
  {
    id: "ma-makerspace",
    text: "de MakerSpace",
    directions: ["makerSpace", "designProductionTrade", "highTechScience"],
  },
  {
    id: "ma-badkamer",
    text: "een kleine badkamer",
    directions: ["housingAndSpace", "sustainability", "energyWaterSafety"],
  },
  {
    id: "ma-festival",
    text: "een festivalterrein",
    directions: ["sports", "sustainability", "digitalMediaEntertainment"],
  },
  {
    id: "ma-schoolplein",
    text: "een schoolplein",
    directions: ["schoolEnvironment", "sports", "livingWorkTraffic"],
  },
  {
    id: "ma-wateroverlast",
    text: "een buurt met wateroverlast",
    directions: ["sustainability", "energyWaterSafety", "housingAndSpace"],
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
    directions: ["sustainability", "makerSpace", "designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "co-zonder-stroom",
    text: "zonder stroom werkt",
    directions: ["sustainability", "digitalMediaEntertainment"],
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
    directions: ["housingAndSpace", "schoolEnvironment"],
    constraintModes: ["foldable"],
  },
  {
    id: "co-waterbestendig",
    text: "waterbestendig is",
    directions: ["energyWaterSafety", "mobility", "sports", "housingAndSpace"],
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
    directions: ["schoolEnvironment", "mobility", "digitalMediaEntertainment"],
    constraintModes: ["withoutApp", "fastPrototype"],
  },
  {
    id: "te-hergebruik",
    text: "hergebruikmateriaal",
    directions: ["sustainability", "designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "te-sensor",
    text: "een sensor of meetprincipe",
    directions: ["highTechScience", "healthcare"],
  },
  {
    id: "te-modulair",
    text: "modulaire onderdelen",
    directions: ["makerSpace", "housingAndSpace", "designProductionTrade"],
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
    directions: ["sustainability", "energyWaterSafety"],
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
    directions: ["sustainability", "designProductionTrade"],
    constraintModes: ["recycledMaterial"],
  },
  {
    id: "tr-gezond",
    text: "gezond gedrag",
    directions: ["healthcare", "sports", "humanHealth"],
  },
  {
    id: "tr-deel",
    text: "deelgebruik",
    directions: ["sustainability", "mobility"],
  },
  {
    id: "tr-klimaat",
    text: "klimaatadaptatie",
    directions: ["sustainability", "energyWaterSafety", "housingAndSpace"],
  },
  {
    id: "tr-gamification",
    text: "gamification",
    directions: ["schoolEnvironment", "sports", "digitalMediaEntertainment"],
  },
  {
    id: "tr-personalisatie",
    text: "personalisatie",
    directions: ["schoolEnvironment", "healthcare", "humanHealth"],
  },
];
