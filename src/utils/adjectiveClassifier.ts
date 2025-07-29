import { AdjectiveCategory, AdjectiveClassification, AdverbCategory, AdverbClassification, CATEGORY_ORDER, ADVERB_ORDER } from '@/types/adjective';
import { findAdverbChains, reorderAdverbs } from './adverbMethods';

// Comprehensive adjective database organized by category with complete GitHub list
const ADJECTIVE_DATABASE: Record<AdjectiveCategory, string[]> = {
  opinion: [
    // Basic opinion adjectives
    'beautiful', 'ugly', 'nice', 'good', 'bad', 'excellent', 'terrible', 'wonderful', 'awful', 'amazing',
    'horrible', 'fantastic', 'lovely', 'disgusting', 'perfect', 'brilliant', 'stupid', 'clever',
    'foolish', 'wise', 'silly', 'smart', 'dumb', 'gorgeous', 'hideous', 'pretty', 'handsome', 'attractive',
    'repulsive', 'charming', 'delightful', 'pleasant', 'unpleasant', 'adorable', 'cute', 'sweet', 'bitter',
    'sour', 'delicious', 'tasty', 'bland', 'spicy', 'mild', 'strong', 'weak', 'powerful', 'gentle',
    'ornate', 'delicate', 'elegant', 'graceful', 'sophisticated', 'refined', 'crude', 'rough', 'smooth',
    'magnificent', 'splendid', 'marvelous', 'superb', 'outstanding', 'exceptional', 'mediocre', 'inferior',
    'superior', 'exquisite', 'stunning', 'breathtaking', 'impressive', 'remarkable', 'extraordinary', 'ordinary',
    'dusty', 'clean', 'dirty', 'spotless', 'grimy', 'pristine', 'tattered', 'worn', 'shabby', 'neat',
    'cracked', 'broken', 'damaged', 'intact', 'flawless', 'imperfect', 'colorful', 'vibrant', 'dull', 'bright',
    'mysterious', 'peculiar', 'heavy', 'fragile', 'tarnished', 'cold',
    // Extended opinion adjectives from user request
    'abandoned', 'abased', 'aberrant', 'abhorrent', 'abiding', 'abject', 'abler', 'ablest', 'able', 'abloom',
    'abnormal', 'abominable', 'about', 'above board', 'aboveboard', 'above', 'abrasive', 'abreast', 'abridged',
    'abrupt', 'abscessed', 'absent', 'absolute', 'absorbed', 'absorbent', 'absorbing', 'abstemious', 'abstinent',
    'abstracted', 'abstract', 'abstruse', 'absurd', 'abundant', 'abusive', 'abutting', 'abuzz', 'abysmal',
    'acceptable', 'accepted', 'accessible', 'accidental', 'accommodating', 'accomplished', 'according', 'accosted',
    'accountable', 'accumulative', 'accurate', 'accursed', 'accusatory', 'accustomed', 'acerbic', 'ace',
    'achievable', 'acidic', 'acidulous', 'acquainted', 'acquiescent', 'acquirable', 'acquisitive', 'acrid',
    'acrimonious', 'actionable', 'active', 'actual', 'acute', 'adamant', 'adaptable', 'adaptive', 'addicted',
    'addictive', 'additional', 'addle', 'adept', 'adequate', 'adherent', 'adhesive', 'adjacent', 'adjoining',
    'adjustable', 'admirable', 'admissible', 'admonitory', 'adopted', 'adoptive', 'adorable', 'adroit',
    'adulterate', 'adulterous', 'advanced', 'advantageous', 'adventitious', 'adventuresome', 'adventurous',
    'adverse', 'advisable', 'advised', 'aery', 'affable', 'affected', 'affecting', 'affectionate', 'affirmative',
    'affluent', 'affordable', 'aforementioned', 'aforesaid', 'aforethought', 'afraid', 'aft', 'agape',
    'agglomerate', 'agglutinate', 'aggregate', 'aggressive', 'aghast', 'agile', 'agleam', 'aglitter', 'aglow',
    'agnostic', 'agog', 'agonizing', 'agreeable', 'agreed', 'ailing', 'aimless', 'airborne', 'airier', 'airiest',
    'airless', 'airsick', 'airtight', 'airworthy', 'airy', 'akin', 'alarmist', 'alert', 'alfresco', 'alienable',
    'alive', 'alleged', 'allergenic', 'allergic', 'allied', 'allover', 'allowable', 'allowed', 'alluring',
    'allusive', 'almighty', 'aloof', 'alterable', 'alternate', 'alternative', 'altruistic', 'amateurish',
    'amateur', 'amatory', 'amazed', 'amazing', 'ambidextrous', 'ambient', 'ambiguous', 'ambitious', 'ambivalent',
    'amenable', 'amendable', 'amiable', 'amicable', 'amnesiac', 'amoral', 'amorous', 'amused', 'amusing',
    'anachronistic', 'anaemic', 'analogous', 'analytic', 'anarchic', 'anarchistic', 'ancillary', 'androgynous',
    'anecdotal', 'anemic', 'angelic', 'angrier', 'angriest', 'angry', 'anguished', 'animated', 'animate',
    'animistic', 'animist', 'annoying', 'anodyne', 'anomalous', 'anonymous', 'answerable', 'antagonistic',
    'anterior', 'anthropocentric', 'anthropomorphic', 'anticipatory', 'anticlimactic', 'anticlockwise', 'antic',
    'antipathetic', 'antisocial', 'antithetical', 'anti', 'antlered', 'anxious', 'apathetic', 'aphasic',
    'aphoristic', 'apocalyptic', 'apocryphal', 'apolitical', 'apologetic', 'apoplectic', 'apostate', 'appalling',
    'apparent', 'appealing', 'appetizing', 'applicable', 'applied', 'appointed', 'appointive', 'appositely',
    'apposite', 'appreciable', 'appreciative', 'apprehensive', 'approachable', 'appropriate', 'approximate',
    'apropos', 'apt', 'arbitrary', 'arcane', 'archetypal', 'ardent', 'arduous', 'arguable', 'argumentative',
    'arid', 'aristocratic', 'armed', 'armored', 'armoured', 'aromatic', 'arrant', 'arresting', 'arrogant',
    'artful', 'arthritic', 'articulated', 'articulate', 'articulating', 'artier', 'artiest', 'artificial',
    'artistic', 'artless', 'arty', 'ascendant', 'ascending', 'ascertainable', 'ascetic', 'ascribable', 'aseptic',
    'asexual', 'ashamed', 'ashier', 'ashiest', 'asinine', 'askance', 'askew', 'asleep', 'asocial', 'aspirant',
    'assailable', 'asserted', 'assertive', 'assiduous', 'assignable', 'associate', 'associative', 'assorted',
    'assumed', 'assuming', 'assured', 'asthmatic', 'astigmatic', 'astir', 'astonishing', 'astounding',
    'astringent', 'astute', 'atavistic', 'atheism', 'atheistic', 'atrocious', 'atrophied', 'attached',
    'attainable', 'attentive', 'attenuate', 'attested', 'attired', 'attractive', 'attributable', 'atwitter',
    'atypical', 'audacious', 'audible', 'augmented', 'august', 'auspicious', 'austere', 'authentic',
    'authorised', 'authoritarian', 'authoritative', 'authorized', 'autistic', 'autocratic', 'autonomous',
    'available', 'avaricious', 'average', 'averse', 'avid', 'avoidable', 'avowed', 'avuncular', 'awakening',
    'aware', 'away', 'awed', 'aweigh', 'awesome', 'awful', 'awkward', 'axiomatic', 'babyish', 'bacchanalian',
    'bacchanal', 'backbreaking', 'backed', 'backhanded', 'backless', 'backstage', 'backstairs', 'backward',
    'back', 'bad', 'baffling', 'baggier', 'baggiest', 'baggy', 'balding', 'bald', 'baleful', 'balkier',
    'balkiest', 'balky', 'balmier', 'balmiest', 'balmy', 'banal', 'bananas', 'banded', 'bandy', 'baneful',
    'bang on', 'bankrupt', 'barbarian', 'barbaric', 'barbarous', 'barbed', 'bareback', 'bared', 'barefaced',
    'barefooted', 'barefoot', 'barehanded', 'bareheaded', 'barer', 'barest', 'bare', 'baring', 'barred',
    'barren', 'basal', 'baseless', 'baser', 'basest', 'base', 'bashful', 'basic', 'bats', 'battier',
    'battiest', 'battled', 'batty', 'bawdier', 'bawdiest', 'bawdy', 'beaded', 'beadier', 'beadiest', 'beady',
    'beaming', 'bearable', 'bearded', 'bearish', 'beastlier', 'beastliest', 'beastly', 'beat up', 'beaten',
    'beatific', 'beauteous', 'beautiful', 'becalmed', 'becoming', 'bedridden', 'beggarly', 'beholden',
    'belated', 'believable', 'bellicose', 'belligerent', 'beloved', 'belted', 'bemused', 'beneficent',
    'beneficial', 'benevolent', 'benighted', 'benign', 'bereft', 'berserk', 'besetting', 'besotted', 'bespoken',
    'bespoke', 'bestial', 'best', 'betrothed', 'better', 'biased', 'bias', 'bibulous', 'bigamous', 'bigoted',
    'bilious', 'billionth', 'billowy', 'binding', 'biodegradable', 'birdbrained', 'bitchier', 'bitchiest',
    'bitchy', 'biting', 'bittersweet', 'bitter', 'bizarre', 'blah', 'blamed', 'blameless', 'blameworthy',
    'bland', 'blank', 'blasphemous', 'blasted', 'blatant', 'bleak', 'blearier', 'bleariest', 'bleary',
    'bleeding', 'blessed', 'blind', 'blinking', 'blissful', 'blithe', 'bloated', 'blocked', 'bloodcurdling',
    'blooded', 'bloodier', 'bloodiest', 'bloodless', 'bloodshot', 'bloodstained', 'bloodthirsty', 'bloodying',
    'bloomed', 'blooming', 'blotchier', 'blotchiest', 'blotchy', 'blowsier', 'blowsiest', 'blowsy', 'blowzier',
    'blowziest', 'blowzy', 'bluff', 'blunt', 'blurry', 'blustery', 'boastful', 'bobs', 'boding', 'boggy',
    'bogus', 'boiled', 'boiling', 'boisterous', 'bold', 'bombastic', 'bonded', 'bone idle', 'boned', 'boneless',
    'bonier', 'boniest', 'bonkers', 'bonnier', 'bonniest', 'bonny', 'bony', 'bookish', 'boon', 'boorish',
    'booted', 'bootleg', 'bootless', 'boots and all', 'boozier', 'booziest', 'boozy', 'bordered', 'borderline',
    'boring', 'bossier', 'bossiest', 'bossy', 'boss', 'bothersome', 'bottomless', 'bottom', 'bouffant',
    'bought', 'bouncing', 'bouncy', 'bounded', 'bounden', 'boundless', 'bound', 'bounteous', 'bountiful',
    'bourgeois', 'boyish', 'bracing', 'brackish', 'braggart', 'braided', 'brainier', 'brainiest', 'brainless',
    'brainy', 'brash', 'brassier', 'brassiest', 'brassy', 'brattier', 'brattiest', 'bratty', 'braver',
    'bravest', 'brave', 'braving', 'brawny', 'brazen', 'breakable', 'breakneck', 'breathable', 'breathed',
    'breathier', 'breathiest', 'breathless', 'breathtaking', 'breathy', 'breezier', 'breeziest', 'breezy',
    'bright', 'brilliant', 'brimful', 'brinier', 'briniest', 'briny', 'brisk', 'bristly', 'brittle',
    'brokenhearted', 'broken', 'broke', 'brotherly', 'brushed', 'brusque', 'brutal', 'brute', 'brutish',
    'bubblier', 'bubbliest', 'bubbly', 'bucked', 'bucktoothed', 'bucolic', 'buggier', 'buggiest', 'buggy',
    'bugs', 'bulimic', 'bulletproof', 'bullheaded', 'bullish', 'bully', 'bumbling', 'bumpier', 'bumpiest',
    'bumptious', 'bumpy', 'bung', 'bunted', 'buoyant', 'burdened', 'burdensome', 'burlier', 'burliest',
    'burned out', 'burned', 'burning', 'burnt', 'bushed', 'bushier', 'bushiest', 'bushy', 'busied', 'busier',
    'busiest', 'businesslike', 'bustled', 'bust', 'busying', 'busy', 'butch', 'buttery', 'buxom', 'cacophonous',
    'cadaverous', 'caddish', 'cagey', 'cagier', 'cagiest', 'cagy', 'calamitous', 'calculable', 'calculated',
    'calculating', 'callable', 'caller', 'callous', 'callow', 'calm', 'campy', 'cancerous', 'candid', 'candied',
    'cankered', 'cankerous', 'canned', 'cannibalistic', 'cannier', 'canniest', 'canny', 'cantankerous', 'cant',
    'capable', 'caped', 'capricious', 'captious', 'captive', 'carcinogenic', 'carefree', 'careful', 'careless',
    'careworn', 'carnal', 'carping', 'carsick', 'cashed up', 'castaway', 'castled', 'castoff', 'casual',
    'cataclysmic', 'cataleptic', 'catastrophic', 'catatonic', 'catchier', 'catchiest', 'catching', 'catchy',
    'catty', 'causeless', 'caustic', 'cautious', 'cavalier', 'ceaseless', 'celebrated', 'celibate', 'censorious',
    'centered', 'central', 'ceremonious', 'certifiable', 'certified', 'chalkier', 'chalkiest', 'chalky',
    'challenging', 'champion', 'chancier', 'chanciest', 'chancy', 'changeable', 'chaotic', 'characteristic',
    'chargeable', 'charged', 'charier', 'chariest', 'charismatic', 'charitable', 'charming', 'chary', 'chaster',
    'chastest', 'chaste', 'chattier', 'chattiest', 'chatty', 'chauvinistic', 'cheap', 'checked', 'checkered',
    'cheekier', 'cheekiest', 'cheeky', 'cheerful', 'cheerier', 'cheeriest', 'cheerless', 'cheery', 'cheesed off',
    'cheesed', 'cheesy', 'chequered', 'cherubic', 'chewier', 'chewiest', 'chewy', 'chichi', 'chicken', 'chic',
    'chiefly', 'chief', 'childish', 'childless', 'childlike', 'chillier', 'chilliest', 'chilly', 'chill',
    'chimerical', 'chintzier', 'chintziest', 'chintzy', 'chipper', 'chiselled', 'chivalrous', 'choicer',
    'choicest', 'choice', 'choking', 'choleric', 'choosey', 'choosier', 'choosiest', 'choosy', 'choppier',
    'choppiest', 'chopping', 'choppy', 'chosen', 'chronic', 'chummier', 'chummiest', 'chummy', 'churlish',
    'circuitous', 'circumspect', 'circumstantial', 'civilized', 'civil', 'clairvoyant', 'clammy', 'clamorous',
    'clandestine', 'clannish', 'clapped out', 'clasping', 'classic', 'classier', 'classiest', 'classifiable',
    'classified', 'classless', 'classy', 'claustrophobic', 'cleanlier', 'cleanliest', 'cleanly', 'clean',
    'clear', 'clement', 'clever', 'clingier', 'clingiest', 'clingy', 'clipped', 'clipping', 'cliquish',
    'clockwise', 'cloistered', 'closed', 'closefisted', 'close', 'clouded', 'cloudier', 'cloudiest', 'cloudless',
    'cloudy', 'clownish', 'cloying', 'clueless', 'clumsier', 'clumsiest', 'clumsy', 'clustered', 'coarser',
    'coarsest', 'coarse', 'coated', 'cockeyed', 'cockier', 'cockiest', 'cocksure', 'cocky', 'coequal',
    'coercive', 'cogent', 'cognisant', 'cognizant', 'coherent', 'cohesive', 'coincidental', 'coincident',
    'cold', 'colicky', 'collaborative', 'collapsible', 'collateral', 'collectable', 'collected', 'collectible',
    'collective', 'collectivist', 'collect', 'collusive', 'colorfast', 'coltish', 'columned', 'comatose',
    'combative', 'combustible', 'comelier', 'comeliest', 'comely', 'comestible', 'comfier', 'comfiest',
    'comfortable', 'comfy', 'comical', 'comic', 'coming', 'commanding', 'commendable', 'commensurable',
    'commensurate', 'commonplace', 'common', 'communal', 'communicable', 'communicative', 'companionable',
    'comparable', 'compassionate', 'compatible', 'competent', 'competitive', 'complacent', 'complaisant',
    'complected', 'complemented', 'complete', 'complexioned', 'complex', 'compliant', 'complicated', 'complicate',
    'complimentary', 'composed', 'comprehensible', 'comprehensive', 'compressed', 'compulsive', 'compulsory',
    'conceited', 'conceivable', 'concerned', 'concerning', 'concerted', 'conciliatory', 'concise', 'conclusive',
    'concomitant', 'concordant', 'concurrent', 'condemnatory', 'condensed', 'condescending', 'conditional',
    'conditioned', 'conducive', 'conductive', 'confidential', 'confident', 'confiding', 'confined', 'confirmed',
    'confluent', 'conformist', 'confounded', 'congenial', 'congenital', 'congestive', 'congruent', 'congruous',
    'conjectural', 'conjoined', 'conjoint', 'connected', 'conscientious', 'conscious', 'consecutive', 'consensual',
    'consequential', 'consequent', 'conservative', 'considerable', 'considerate', 'considered', 'consistent',
    'conspicuous', 'conspiratorial', 'constant', 'constrained', 'constrictive', 'constructive', 'consumable',
    'consummate', 'consumptive', 'contagious', 'contained', 'contaminate', 'contemplative', 'contemptible',
    'contemptuous', 'contented', 'contentious', 'contiguous', 'contingent', 'continual', 'continuous', 'contracted',
    'contractile', 'contradictory', 'contrary', 'contrite', 'contrived', 'controllable', 'controversial',
    'contumacious', 'convalescent', 'convenient', 'conventional', 'convergent', 'conversant', 'converse',
    'converted', 'convertible', 'convincing', 'convivial', 'convoluted', 'convulsive', 'cool', 'cooperative',
    'copious', 'coquettish', 'corded', 'cordial', 'cordless', 'corked', 'corking', 'cornball', 'corned',
    'cornered', 'cornier', 'corniest', 'corny', 'correctable', 'correct', 'corrosive', 'corrugate', 'corruptible',
    'corrupt', 'cosier', 'cosiest', 'cosies', 'cosmopolitan', 'costlier', 'costliest', 'costly', 'cosy',
    'countable', 'counterclockwise', 'counterfeit', 'counterproductive', 'countless', 'countrified', 'courageous',
    'coursed', 'courteous', 'courtlier', 'courtliest', 'courtly', 'covert', 'covetous', 'cowardly', 'coy',
    'cozier', 'coziest', 'cozies', 'cozy', 'crabbed', 'crabbier', 'crabbiest', 'crabby', 'cracked', 'crackerjack',
    'cracking', 'crackly', 'crackpot', 'crack', 'craftier', 'craftiest', 'crafty', 'craggier', 'craggiest',
    'craggy', 'cramped', 'crankier', 'crankiest', 'cranky', 'crank', 'crashing', 'crass', 'craven', 'crazed',
    'crazier', 'craziest', 'crazy', 'creakier', 'creakiest', 'creaky', 'creamier', 'creamiest', 'creamy',
    'creative', 'credible', 'creditable', 'credulous', 'creepier', 'creepiest', 'creepy', 'crested', 'crestfallen',
    'cretinous', 'crinklier', 'crinkliest', 'crinkly', 'crippling', 'crispier', 'crispiest', 'crispy', 'crisp',
    'critical', 'crocked', 'crossbred', 'crossed', 'crosswise', 'cross', 'crotchety', 'croupiest', 'croupy',
    'crowded', 'crowned', 'crowning', 'crucial', 'cruder', 'crudest', 'crude', 'cruel', 'crumbier', 'crumbiest',
    'crumblier', 'crumbliest', 'crumbly', 'crumby', 'crumb', 'crummier', 'crummiest', 'crummy', 'crunchier',
    'crunchiest', 'crunchy', 'crushing', 'crusted', 'crustier', 'crustiest', 'crusty', 'crying', 'cryptic',
    'cuckoo', 'cuddly', 'culpable', 'cultivated', 'cultured', 'cumbersome', 'cumulative', 'cunning', 'curable',
    'curious', 'curlier', 'curliest', 'cursed', 'cursory', 'curst', 'curt', 'cushier', 'cushiest', 'cushy',
    'cussed', 'customary', 'cuter', 'cutest', 'cute', 'cutthroat', 'cutting', 'cut', 'cynical', 'cynic',
    'cystic', 'daffier', 'daffiest', 'daffy', 'daft', 'daintier', 'daintiest', 'dainties', 'dainty', 'damnable',
    'damndest', 'damned', 'damning', 'damp', 'dandy', 'dangerous', 'dank', 'dapper', 'dappled', 'dapple',
    'daredevil', 'daring', 'darling', 'darned', 'dashed', 'dashing', 'dastardly', 'dauntless', 'dead set',
    'deadlier', 'deadliest', 'deadly', 'deadpan', 'dead', 'deaf', 'dear', 'deathless', 'deathlike', 'deathly',
    'debatable', 'debauched', 'debonair', 'decadent', 'deceased', 'deceitful', 'decent', 'deceptive', 'decided',
    'decipherable', 'decisive', 'declared', 'decomposed', 'decorous', 'decrepit', 'dedicated', 'dedicate',
    'deducible', 'deductible', 'defamatory', 'defeatist', 'defective', 'defenceless', 'defenseless', 'defensible',
    'defensive', 'deferential', 'deferred', 'defiant', 'deficient', 'definable', 'definite', 'definitive',
    'deflected', 'deformed', 'deft', 'defunct', 'degenerate', 'degenerative', 'degraded', 'degrading', 'dejected',
    'deject', 'delectable', 'deleterious', 'deliberate', 'delicate', 'delicious', 'delighted', 'delightful',
    'delinquent', 'deliquescent', 'delirious', 'delusive', 'deluxe', 'demagogic', 'demanding', 'demented',
    'demoniac', 'demonic', 'demonstrable', 'demonstrative', 'demurer', 'demurest', 'demure', 'departed',
    'dependable', 'dependent', 'deplorable', 'depraved', 'deprecatory', 'depressed', 'depressive', 'deprived',
    'deranged', 'derelict', 'derisive', 'derivable', 'derogate', 'derogatory', 'describable', 'deserted',
    'deserved', 'deserving', 'desiccated', 'designed', 'designing', 'desirable', 'desired', 'desirous',
    'desolate', 'despairing', 'desperate', 'despicable', 'despondent', 'despotic', 'destined', 'destitute',
    'destructible', 'destructive', 'desultory', 'detachable', 'detached', 'detailed', 'detectable', 'determinable',
    'determinate', 'determined', 'detestable', 'detrimental', 'deviant', 'deviate', 'deviled', 'devilish',
    'devious', 'devoid', 'devoted', 'devout', 'dewy', 'dexterous', 'dextrous', 'diabetic', 'diabolical',
    'diabolic', 'diaphanous', 'dicey', 'dicky', 'dictatorial', 'different', 'difficult', 'diffident', 'diffuse',
    'digestible', 'dignified', 'digressive', 'dilapidated', 'dilatory', 'dilettante', 'diligent', 'dilute',
    'diminished', 'dimmed', 'dimmest', 'dimming', 'dim', 'dingier', 'dingiest', 'dingy', 'dipsomaniac',
    'directed', 'direct', 'direr', 'direst', 'dire', 'dirtier', 'dirtiest', 'dirty', 'disadvantaged',
    'disadvantageous', 'disagreeable', 'disappointed', 'disarming', 'disastrous', 'discernible', 'discerning',
    'disconcerted', 'disconnected', 'disconsolate', 'discontented', 'discontent', 'discontinuous', 'discordant',
    'discourteous', 'discreditable', 'discreet', 'discrete', 'discriminate', 'discriminating', 'discriminatory',
    'discursive', 'disdainful', 'diseased', 'disembodied', 'disgraceful', 'disgustingly', 'disgusting',
    'disharmonious', 'dishevelled', 'dishonest', 'dishonorable', 'disinclined', 'disingenuous', 'disinterested',
    'disjointed', 'disjoint', 'disloyal', 'dismal', 'dismissive', 'disobedient', 'disordered', 'disorderly',
    'disparate', 'dispassionate', 'dispensable', 'disperse', 'dispirited', 'displayed', 'disposable', 'disposed',
    'dispossessed', 'disproportionate', 'disputable', 'disputatious', 'disquieting', 'disquiet', 'disreputable',
    'disrespectful', 'disruptive', 'dissatisfied', 'dissected', 'dissident', 'dissimilar', 'dissipated',
    'dissolute', 'dissonant', 'distant', 'distasteful', 'distended', 'distilled', 'distinctive', 'distinct',
    'distinguishable', 'distinguished', 'distinguishing', 'distorted', 'distracted', 'distrait', 'distraught',
    'distressed', 'distressful', 'distrustful', 'disturbed', 'disturbing', 'disused', 'divergent', 'diverse',
    'diverting', 'divided', 'divine', 'divisible', 'divisive', 'dizzied', 'dizzier', 'dizziest', 'dizzying',
    'dizzy', 'doable', 'docile', 'doctrinaire', 'doddered', 'doddering', 'dogged', 'doggier', 'doggiest',
    'doggoned', 'doggy', 'dogmatic', 'doleful', 'dolorous', 'doltish', 'dominant', 'domineering', 'dopey',
    'dopier', 'dopiest', 'dopy', 'dormant', 'doting', 'dotted', 'dotty', 'doubled', 'double', 'doubling',
    'doubtful', 'doubtless', 'doughier', 'doughiest', 'doughtier', 'doughtiest', 'doughty', 'doughy', 'dour',
    'dovetailed', 'dowdy', 'downbeat', 'downcast', 'downhearted', 'downhill', 'downier', 'downiest', 'downright',
    'downstream', 'downtrodden', 'downward', 'downwind', 'downy', 'draftier', 'draftiest', 'drafty', 'dragging',
    'drastic', 'draughtier', 'draughtiest', 'draughty', 'drawn', 'dreadful', 'dreamier', 'dreamiest', 'dreamless',
    'dreamlike', 'dreamy', 'drearier', 'dreariest', 'dreary', 'dressier', 'dressiest', 'dressy', 'drier',
    'driest', 'drinkable', 'droll', 'droopier', 'droopiest', 'droopy', 'drowsier', 'drowsiest', 'drowsy',
    'drunken', 'drunk', 'dryer', 'drying', 'drys', 'dry', 'dual', 'dubious', 'ductile', 'ductless', 'dud',
    'duff', 'dulcet', 'dull', 'dumb', 'dumpier', 'dumpiest', 'dumpy', 'duplicate', 'durable', 'duskier',
    'duskiest', 'dustier', 'dustiest', 'dustless', 'dusty', 'duteous', 'dutiable', 'dutiful', 'dying',
    'dynamic', 'dyspeptic', 'earnest', 'earsplitting', 'earthier', 'earthiest', 'earthlier', 'earthliest',
    'earthly', 'earthshaking', 'earthward', 'earthy', 'easier', 'easiest', 'eastbound', 'easygoing', 'easy',
    'eatable', 'ebullient', 'eccentric', 'eclectic', 'economical', 'ecstatic', 'edgier', 'edgiest', 'edging',
    'edgy', 'edible', 'educable', 'educated', 'eerier', 'eeriest', 'eerie', 'eery', 'effective', 'effectual',
    'effeminate', 'effervescent', 'effete', 'efficacious', 'efficient', 'effortless', 'effulgent', 'effusive',
    'egalitarian', 'egocentric', 'egoistic', 'egotistic', 'egregious', 'eighteenth', 'eighth', 'eightieth',
    'elaborate', 'elated', 'elect', 'elegant', 'elevated', 'eleventh', 'elfin', 'elfish', 'eligible', 'elite',
    'eloquent', 'elusive', 'emaciated', 'emasculate', 'embattled', 'emergent', 'eminent', 'emotional', 'emotive',
    'emphatic', 'employable', 'emptied', 'emptiest', 'empties', 'emptying', 'empty', 'enabling', 'enchanting',
    'endless', 'endorsed', 'endurable', 'enduring', 'endways', 'energetic', 'enervated', 'enervate', 'enforceable',
    'engaged', 'engaging', 'engrossing', 'enhanced', 'enigmatic', 'enjoyable', 'enterprising', 'entertaining',
    'enthusiastic', 'entire', 'enumerable', 'enviable', 'envious', 'ephemeral', 'epicurean', 'epic', 'epileptic',
    'episodic', 'equable', 'equal', 'equidistant', 'equitable', 'equivalent', 'equivocal', 'erased', 'erect',
    'erosive', 'errant', 'erratic', 'erring', 'erroneous', 'ersatz', 'erudite', 'escapist', 'esoteric',
    'especial', 'essential', 'estimable', 'ethereal', 'ethical', 'euphoric', 'evanescent', 'evasive', 'evens',
    'eventful', 'even', 'evident', 'evil', 'evocative', 'exacting', 'exact', 'exaggerated', 'exalted',
    'exasperate', 'exceeding', 'excellent', 'exceptionable', 'exceptional', 'excessive', 'excess', 'exchangeable',
    'excitable', 'excited', 'exciting', 'exclusive', 'excruciating', 'excusable', 'execrable', 'exemplary',
    'exhaustible', 'exhaustive', 'exigent', 'exiguous', 'existent', 'exorbitant', 'expandable', 'expanded',
    'expansive', 'expectant', 'expecting', 'expedient', 'expeditious', 'expendable', 'expensive', 'experienced',
    'expert', 'explicable', 'explicit', 'exploitative', 'explosive', 'exposed', 'expressible', 'expressionless',
    'expressive', 'exquisite', 'extant', 'extemporaneous', 'extempore', 'extendable', 'extended', 'extendible',
    'extensive', 'extenuating', 'exterior', 'external', 'extinct', 'extinguishable', 'extortionate', 'extraneous',
    'extraordinary', 'extravagant', 'extra', 'extremer', 'extremest', 'extreme', 'extremist', 'extrinsic',
    'extrovert', 'exuberant', 'exultant', 'eyed', 'fabled', 'fabulous', 'faceless', 'facetious', 'facile',
    'factitious', 'factual', 'faddish', 'fainthearted', 'faint', 'fain', 'fair', 'faithful', 'faithless',
    'fake', 'fallacious', 'fallen', 'fallible', 'fallow', 'falser', 'falsest', 'FALSE', 'falsifiable', 'famed',
    'familiar', 'famished', 'famous', 'fanatical', 'fanatic', 'fancied', 'fanciful', 'fancy', 'fantastic',
    'faraway', 'farcical', 'farsighted', 'farther', 'farthest', 'far', 'fascinating', 'fashionable', 'fastidious',
    'fast', 'fatalistic', 'fatal', 'fated', 'fateful', 'fatherless', 'fatherly', 'fathomable', 'fathomless',
    'fatigued', 'fatigue', 'fattier', 'fattiest', 'fatty', 'fatuous', 'faultfinding', 'faultier', 'faultiest',
    'faultless', 'faulty', 'favorable', 'favored', 'favorite', 'favourable', 'favoured', 'favourite', 'fearful',
    'fearless', 'fearsome', 'feasible', 'feathered', 'feathery', 'featureless', 'feat', 'febrile', 'feckless',
    'fecund', 'fed up', 'feebler', 'feeblest', 'feeble', 'feeling', 'feigned', 'feisty', 'felicitous', 'fell',
    'felonious', 'feral', 'ferocious', 'fertile', 'fervent', 'fervid', 'festive', 'fetching', 'fetid', 'fetishistic',
    'feverish', 'fewer', 'fey', 'fickle', 'fictitious', 'fiddling', 'fiddly', 'fidgety', 'fiendish', 'fiercer',
    'fiercest', 'fierce', 'fierier', 'fieriest', 'fiery', 'fifteenth', 'fifth', 'fiftieth', 'figured',
    'filigreed', 'filmier', 'filmiest', 'filmy', 'filterable', 'filthier', 'filthiest', 'filthy', 'filtrable',
    'final', 'finer', 'finest', 'finger tight', 'fingered', 'finicky', 'finished', 'finite', 'finny', 'fireproof',
    'firm', 'firsthand', 'first', 'fishier', 'fishiest', 'fishy', 'fitful', 'fitted', 'fitting', 'fixable',
    'fixed', 'fizzier', 'fizziest', 'fizzy', 'flabbier', 'flabbiest', 'flabby', 'flaccid', 'flagrant',
    'flakier', 'flakiest', 'flaky', 'flamboyant', 'flaming', 'flammable', 'flaring', 'flashier', 'flashiest',
    'flashy', 'flash', 'flatfooted', 'flattest', 'flatulent', 'flavorful', 'flavorless', 'flavourful',
    'flavourless', 'flawed', 'flawless', 'fledged', 'fleecier', 'fleeciest', 'fleecy', 'fleeting', 'fleet',
    'fleshier', 'fleshiest', 'fleshlier', 'fleshliest', 'fleshly', 'fleshy', 'flexed', 'flexible', 'flightier',
    'flightiest', 'flightless', 'flighty', 'flimsier', 'flimsy', 'flintier', 'flintiest', 'flinty', 'flippant',
    'flippest', 'flipping', 'flip', 'flirtatious', 'flitting', 'floating', 'flooded', 'floppier', 'floppiest',
    'floppy', 'florid', 'flourishing', 'floury', 'flowered', 'flowering', 'flowery', 'flowing', 'flown',
    'fluent', 'fluffier', 'fluffiest', 'fluffy', 'flukey', 'flukier', 'flukiest', 'fluky', 'fluorescent',
    'flurried', 'flush', 'fluted', 'fluttery', 'foamier', 'foamiest', 'foamy', 'foetid', 'fogbound', 'fogged',
    'foggier', 'foggiest', 'foggy', 'foiled', 'folksier', 'folksiest', 'folksy', 'following', 'foolhardier',
    'foolhardiest', 'foolhardy', 'foolish', 'foolproof', 'fool', 'footed', 'footloose', 'footsore', 'foppish',
    'forbidden', 'forbidding', 'forced', 'forceful', 'forcible', 'foreboding', 'foregoing', 'foregone',
    'foremost', 'foreseeable', 'fore', 'forfeit', 'forgetful', 'forgettable', 'forgivable', 'forgiving',
    'forlorn', 'formal', 'formidable', 'formless', 'formulaic', 'forsaken', 'forthcoming', 'forthright',
    'fortieth', 'fortuitous', 'fortunate', 'forward', 'foul', 'found', 'fourfold', 'fourteenth', 'fourth',
    'foxier', 'foxiest', 'foxy', 'fractious', 'fragile', 'fragmentary', 'fragmented', 'fragrant', 'frail',
    'frank', 'frantic', 'fraudulent', 'fraught', 'frazzled', 'freakier', 'freakiest', 'freakish', 'freaky',
    'freeing', 'freer', 'freestanding', 'freest', 'freethinking', 'freewheeling', 'freezing', 'free',
    'frenetic', 'frenzied', 'frequent', 'fretful', 'fretted', 'friable', 'friended', 'friendless', 'friendlier',
    'friendliest', 'friendly', 'frightened', 'frightful', 'frigid', 'frilly', 'friskier', 'friskiest',
    'frisky', 'frivolous', 'frizzier', 'frizziest', 'frizzy', 'frolicsome', 'frolic', 'front', 'frostbitten',
    'frosted', 'frostier', 'frostiest', 'frosty', 'frothier', 'frothiest', 'frothy', 'frowsier', 'frowsiest',
    'frowsy', 'frowzier', 'frowziest', 'frowzy', 'frozen', 'frugal', 'fruited', 'fruitful', 'fruitier',
    'fruitiest', 'fruitless', 'fruity', 'frumpier', 'frumpiest', 'frumpy', 'frustrate', 'fugitive',
    'fully fledged', 'fulsome', 'fumed', 'fundamental', 'funereal', 'funked', 'funkier', 'funkiest', 'funky',
    'funnier', 'funniest', 'funny', 'furious', 'furred', 'furriest', 'furry', 'furthermost', 'further',
    'furthest', 'furtive', 'fusible', 'fussier', 'fussiest', 'fussy', 'fustier', 'fustiest', 'fusty',
    'futile', 'futuristic', 'fuzzier', 'fuzziest', 'fuzzy', 'gabby', 'gainful', 'gallant', 'galling',
    'galloping', 'gamer', 'gamest', 'game', 'gamier', 'gamiest', 'gamy', 'ganglier', 'gangliest', 'gangling',
    'gangly', 'gangrenous', 'garish', 'garlicky', 'garrulous', 'gassier', 'gassiest', 'gassy', 'gated',
    'gauche', 'gaudy', 'gaunt', 'gauzier', 'gauziest', 'gauzy', 'gawkier', 'gawkiest', 'gawky', 'geegaw',
    'gelid', 'general', 'generic', 'generous', 'genial', 'genteel', 'gentled', 'gentlemanly', 'gentler',
    'gentlest', 'gentle', 'gentling', 'genuine', 'germane', 'gewgaw', 'ghastlier', 'ghastliest', 'ghastly',
    'ghostlier', 'ghostliest', 'ghostly', 'ghoulish', 'giddier', 'giddiest', 'giddy', 'gifted', 'gigglier',
    'giggliest', 'giggly', 'gilded', 'gimcrack', 'gimmicky', 'gimpy', 'gingerly', 'ginned', 'girlish',
    'girt', 'glad', 'glamorous', 'glare', 'glaring', 'glassier', 'glassiest', 'glassy', 'glazed', 'gleeful',
    'glibber', 'glibbest', 'glib', 'glimmering', 'glittery', 'global', 'gloomier', 'gloomiest', 'gloomy',
    'glorious', 'glossier', 'glossiest', 'glossies', 'glossy', 'glowing', 'gluey', 'gluier', 'gluiest',
    'glummer', 'glummest', 'glum', 'gluttonous', 'gnarled', 'gnarlier', 'gnarliest', 'gnarly', 'gnomish',
    'goddamned', 'godforsaken', 'godless', 'godlier', 'godliest', 'godlike', 'godly', 'going', 'gone',
    'goodlier', 'goodliest', 'goodly', 'good', 'gooey', 'goofier', 'goofiest', 'goofy', 'gooier', 'gooiest',
    'gorged', 'gorgeous', 'gorier', 'goriest', 'gory', 'gossipy', 'goutier', 'goutiest', 'gouty', 'governable',
    'graceful', 'graceless', 'gracious', 'gradual', 'graduated', 'grainier', 'grainiest', 'grainy',
    'grandiloquent', 'grandiose', 'grand', 'granular', 'graphic', 'grasping', 'grassier', 'grassiest',
    'grassy', 'grateful', 'gratifying', 'grating', 'gratuitous', 'gravelly', 'graven', 'gravest', 'grave',
    'greasier', 'greasiest', 'greasy', 'greatest', 'great', 'greedier', 'greediest', 'greedy', 'gregarious',
    'grievous', 'grilled', 'grimier', 'grimiest', 'grimmer', 'grimmest', 'grimy', 'grim', 'grislier',
    'grisliest', 'grisly', 'gristly', 'grittier', 'grittiest', 'gritty', 'grizzlier', 'grizzliest',
    'grizzlies', 'groggier', 'groggiest', 'groggy', 'grooved', 'groovier', 'grooviest', 'groovy', 'groping',
    'gross', 'grotesque', 'grouchier', 'grouchiest', 'grouchy', 'groundless', 'ground', 'grouse', 'growing',
    'grown', 'grubbier', 'grubbiest', 'grubby', 'grudging', 'grueling', 'gruelling', 'gruesome', 'gruff',
    'grumpier', 'grumpiest', 'grumpy', 'guarded', 'guessable', 'guided', 'guileful', 'guileless', 'guiltier',
    'guiltiest', 'guiltless', 'guilty', 'gullible', 'gummed', 'gummier', 'gummiest', 'gummy', 'gunned',
    'gushier', 'gushiest', 'gushy', 'gustier', 'gustiest', 'gusty', 'gutless', 'gutsier', 'gutsiest',
    'gutsy', 'habitable', 'habitual', 'hacking', 'hackneyed', 'hack', 'haggard', 'hairier', 'hairiest',
    'hairless', 'hairsplitting', 'hairy', 'halcyon', 'halest', 'hale', 'half seas over', 'halfhearted',
    'halfway', 'hallowed', 'hallucinatory', 'halting', 'hammered', 'handcrafted', 'handed', 'handicapped',
    'handier', 'handiest', 'handmade', 'handsomer', 'handsomest', 'handsome', 'handwritten', 'handy',
    'hangdog', 'hanging', 'haphazard', 'hapless', 'happier', 'happiest', 'happy', 'harassed', 'hard and fast',
    'hardened', 'hardheaded', 'hardhearted', 'hardier', 'hardiest', 'hardy', 'hard', 'harebrained',
    'harmful', 'harmless', 'harmonious', 'harsh', 'hastier', 'hastiest', 'hasty', 'hateful', 'haughtier',
    'haughtiest', 'haughty', 'haunted', 'haunting', 'hawkish', 'haywire', 'hazardous', 'hazier', 'haziest',
    'hazy', 'headed', 'headfirst', 'headier', 'headiest', 'headless', 'headlong', 'headstrong', 'heady',
    'healthful', 'healthier', 'healthiest', 'healthy', 'heaping', 'heartbreaking', 'heartbroken', 'heartfelt',
    'heartier', 'heartiest', 'hearties', 'heartless', 'heartrending', 'heartsick', 'heartwarming', 'hearty',
    'heated', 'heathenish', 'heavenly', 'heavenward', 'hectic', 'hedonistic', 'hedonist', 'heedful',
    'heedless', 'heeled', 'heinous', 'hellish', 'helpful', 'helpless', 'hep', 'herculean', 'heretical',
    'hermetic', 'heroic', 'hesitant', 'heterodox', 'heterogeneous', 'hidden', 'hidebound', 'hideous',
    'hifalutin', 'highborn', 'highbrow', 'highfalutin', 'highly strung', 'hilarious', 'hillier', 'hilliest',
    'hilly', 'hinder', 'hindmost', 'hind', 'hipped', 'hipper', 'hippest', 'hippy', 'hirsute', 'histrionic',
    'hither', 'hit', 'hoarier', 'hoariest', 'hoarse', 'hobnailed', 'hogged', 'hoggish', 'hokey', 'holier',
    'holiest', 'holistic', 'holstered', 'holy', 'homeless', 'homelier', 'homeliest', 'homely', 'homemade',
    'homesick', 'homeward', 'homey', 'home', 'homicidal', 'homier', 'homiest', 'homogeneous', 'homy',
    'honest', 'honeyed', 'honied', 'honorable', 'honorary', 'honourable', 'hooded', 'hoofed', 'hopeful',
    'hopeless', 'hopping', 'horned', 'hornier', 'horniest', 'hornless', 'horny', 'horrendous', 'horrible',
    'horrid', 'horrific', 'horsey', 'horsier', 'horsiest', 'horsy', 'hospitable', 'hostile', 'hotheaded',
    'hotshot', 'hotter', 'hottest', 'hot', 'housebound', 'howling', 'huffier', 'huffiest', 'huffy',
    'hull down', 'humane', 'humbled', 'humbler', 'humblest', 'humble', 'humbling', 'humdrum', 'humid',
    'humming', 'humorless', 'humorous', 'humourless', 'hundredfold', 'hundredth', 'hungry', 'hung',
    'hunted', 'hurried', 'hurtful', 'hurtling', 'huskier', 'huskiest', 'husky', 'hydrated', 'hygienic',
    'hyped up', 'hyperactive', 'hypercritical', 'hypersensitive', 'hyphenated', 'hypochondriac', 'hypocritical',
    'hypoglycemic', 'hypothetical', 'hysterical', 'hysteric', 'icebound', 'iced', 'icier', 'iciest',
    'ickier', 'ickiest', 'icky', 'iconoclastic', 'icy', 'idealistic', 'idealist', 'ideal', 'identical',
    'identifiable', 'idiosyncratic', 'idiotic', 'idled', 'idlest', 'idle', 'idling', 'idolatrous', 'idyllic',
    'iffy', 'ignoble', 'ignominious', 'ignorant', 'illegal', 'illegible', 'illegitimate', 'illiberal',
    'illicit', 'illiterate', 'illogical', 'illuminating', 'illusive', 'illusory', 'illustrious', 'ill',
    'imaginable', 'imaginary', 'imaginative', 'imbecile', 'imbecilic', 'imitative', 'immaculate', 'immanent',
    'immaterial', 'immeasurable', 'immediate', 'immersed', 'imminent', 'immobile', 'immoderate', 'immodest',
    'immoral', 'immortal', 'immovable', 'immune', 'immutable', 'impacted', 'impalpable', 'impartial',
    'impassable', 'impassioned', 'impassive', 'impatient', 'impeccable', 'impecunious', 'impel', 'impending',
    'impenetrable', 'impenitent', 'imperative', 'imperceptible', 'imperfect', 'imperious', 'imperishable',
    'impermanent', 'impermeable', 'impermissible', 'impersonal', 'impertinent', 'imperturbable', 'impervious',
    'impetuous', 'impious', 'impish', 'implacable', 'implausible', 'implicit', 'implied', 'impolite',
    'impolitic', 'imponderable', 'important', 'importunate', 'imposing', 'impossible', 'impotent', 'impoverished',
    'impracticable', 'impractical', 'imprecise', 'impregnable', 'impregnate', 'impressionable', 'impressive',
    'improbable', 'impromptu', 'improper', 'improvable', 'improvident', 'imprudent', 'impudent', 'impulsive',
    'impure', 'inaccessible', 'inaccurate', 'inactive', 'inadequate', 'inadmissible', 'inadvertent',
    'inadvisable', 'inalienable', 'inane', 'inanimate', 'inapplicable', 'inappropriate', 'inapt', 'inarticulate',
    'inattentive', 'inaudible', 'inauspicious', 'inboard', 'inborn', 'inbound', 'inbred', 'inbreed',
    'incalculable', 'incandescent', 'incapable', 'incarnate', 'incautious', 'incendiary', 'incessant',
    'incestuous', 'inchoate', 'incidental', 'incipient', 'incised', 'incisive', 'inclement', 'included',
    'inclusive', 'incoherent', 'incombustible', 'incoming', 'incommensurate', 'incomparable', 'incompatible',
    'incompetent', 'incomplete', 'incomprehensible', 'inconceivable', 'inconclusive', 'incongruous',
    'inconsequential', 'inconsiderable', 'inconsiderate', 'inconsistent', 'inconsolable', 'inconspicuous',
    'inconstant', 'incontestable', 'incontinent', 'incontrovertible', 'inconvenient', 'incorporated',
    'incorporate', 'incorporating', 'incorporeal', 'incorrect', 'incorrigible', 'incorruptible', 'increasing',
    'incredible', 'incredulous', 'incremental', 'incriminatory', 'incrust', 'incumbent', 'incurable',
    'incurious', 'indebted', 'indecent', 'indecipherable', 'indecisive', 'indecorous', 'indefatigable',
    'indefensible', 'indefinable', 'indefinite', 'indelible', 'indelicate', 'indented', 'independent',
    'indescribable', 'indestructible', 'indeterminable', 'indeterminate', 'indictable', 'indifferent',
    'indigent', 'indigestible', 'indignant', 'indirect', 'indiscernible', 'indiscreet', 'indiscriminate',
    'indispensable', 'indisposed', 'indisputable', 'indissoluble', 'indistinct', 'indistinguishable',
    'individualistic', 'individual', 'indivisible', 'indolent', 'indomitable', 'indubitable', 'indulgent',
    'industrious', 'inebriate', 'inedible', 'ineducable', 'ineffable', 'ineffective', 'ineffectual',
    'inefficient', 'inelastic', 'inelegant', 'ineligible', 'ineluctable', 'inept', 'inequitable', 'inert',
    'inescapable', 'inessential', 'inestimable', 'inevitable', 'inexact', 'inexcusable', 'inexhaustible',
    'inexorable', 'inexpedient', 'inexpensive', 'inexperienced', 'inexpert', 'inexplicable', 'inexpressible',
    'inextinguishable', 'inextricable', 'infallible', 'infamous', 'infatuated', 'infatuate', 'infeasible',
    'infectious', 'infect', 'infelicitous', 'inferior', 'infernal', 'infertile', 'infirm', 'inflammable',
    'inflammatory', 'inflatable', 'inflated', 'inflexible', 'influential', 'informal', 'informed',
    'infrequent', 'infuriate', 'ingenious', 'ingenuous', 'inglorious', 'ingrained', 'ingrain', 'ingrate',
    'ingratiating', 'ingrown', 'inhabitable', 'inhabited', 'inherent', 'inherited', 'inhospitable',
    'inhumane', 'inhuman', 'inimical', 'inimitable', 'iniquitous', 'initial', 'injudicious', 'injured',
    'injurious', 'inlaid', 'inland', 'inmost', 'innate', 'innermost', 'inner', 'innocent', 'innocuous',
    'innovative', 'innumerable', 'inoffensive', 'inoperable', 'inoperative', 'inopportune', 'inordinate',
    'inquiring', 'inquisitive', 'insane', 'insatiable', 'inscrutable', 'insecure', 'insensate', 'insensible',
    'insensitive', 'insentient', 'inseparable', 'inserted', 'inshore', 'insides', 'inside', 'insidious',
    'insightful', 'insignificant', 'insincere', 'insinuating', 'insipid', 'insistent', 'insolent', 'insoluble',
    'insolvable', 'insolvent', 'insomniac', 'insouciant', 'instantaneous', 'instant', 'instinctive',
    'insubordinate', 'insubstantial', 'insufferable', 'insufficient', 'insular', 'insulting', 'insuperable',
    'insupportable', 'insured', 'insurgent', 'insurmountable', 'intact', 'intangible', 'intelligent',
    'intelligible', 'intemperate', 'intended', 'intense', 'intensive', 'intentional', 'intent', 'interchangeable',
    'interdependent', 'interested', 'interesting', 'interior', 'intermediate', 'interminable', 'intermittent',
    'internal', 'internecine', 'interrelated', 'interrupted', 'intimate', 'intolerable', 'intolerant',
    'intoxicated', 'intractable', 'intransigent', 'intrepid', 'intricate', 'intrinsic', 'introspective',
    'introvert', 'intrusive', 'intuitive', 'invalid', 'invaluable', 'invariable', 'invariant', 'invasive',
    'inventive', 'inveterate', 'invidious', 'invincible', 'inviolable', 'inviolate', 'invisible', 'inviting',
    'involuntary', 'involved', 'invulnerable', 'inward', 'in', 'irascible', 'irate', 'irksome', 'ironclad',
    'ironical', 'ironic', 'irony', 'irrational', 'irreconcilable', 'irrecoverable', 'irredeemable',
    'irrefutable', 'irregardless', 'irregular', 'irrelevant', 'irreligious', 'irremediable', 'irreparable',
    'irreplaceable', 'irrepressible', 'irreproachable', 'irresistible', 'irresolute', 'irrespective',
    'irresponsible', 'irretrievable', 'irreverent', 'irreversible', 'irrevocable', 'irritable', 'isolate',
    'isolating', 'itchier', 'itchiest', 'itching', 'itchy', 'itinerant', 'jaded', 'jauntier', 'jauntiest',
    'jaunty', 'jazzier', 'jazziest', 'jazzy', 'jealous', 'jejune', 'jellied', 'jerkier', 'jerkiest',
    'jerkwater', 'jerky', 'jesting', 'jiggered', 'jingoistic', 'jingoist', 'jittery', 'jobless', 'jocose',
    'jocular', 'jocund', 'jointed', 'joint', 'jollier', 'jolliest', 'jolly', 'jovial', 'joyful', 'joyless',
    'joyous', 'jubilant', 'judgemental', 'judgmental', 'judicious', 'juicier', 'juiciest', 'juicy',
    'jumpier', 'jumpiest', 'jumpy', 'justifiable', 'just', 'kaleidoscopic', 'keen', 'keyed', 'killing',
    'kindhearted', 'kindlier', 'kindliest', 'kindly', 'kindred', 'kind', 'kinglier', 'kingliest', 'kingly',
    'kinkier', 'kinkiest', 'kinky', 'kittenish', 'klutzy', 'knavish', 'knightly', 'knobbier', 'knobbiest',
    'knobby', 'knotted', 'knottier', 'knottiest', 'knotty', 'knowable', 'knowing', 'knowledgeable', 'known',
    'kookier', 'kookiest', 'kooky', 'labored', 'laborious', 'laboured', 'labyrinthine', 'lacerated',
    'lacerate', 'lachrymose', 'lacier', 'laciest', 'lackadaisical', 'lacking', 'lackluster', 'lacklustre',
    'laconic', 'lacy', 'laden', 'ladylike', 'laggard', 'lambent', 'lamentable', 'lamented', 'lamer',
    'lamest', 'lame', 'laming', 'landed', 'landlocked', 'landward', 'languid', 'languishing', 'languorous',
    'larcenous', 'lascivious', 'lashed', 'last', 'latent', 'latticed', 'laudable', 'laudatory', 'laughable',
    'laughing', 'lavish', 'lawful', 'lawless', 'lax', 'lay', 'lazier', 'laziest', 'lazy', 'leading',
    'leafed', 'leafier', 'leafiest', 'leafless', 'leafy', 'leaky', 'learned', 'least', 'leaved', 'lecherous',
    'leerier', 'leeriest', 'leery', 'leeward', 'leftover', 'left', 'legendary', 'legged', 'leggier',
    'leggiest', 'leggy', 'legible', 'legion', 'legitimated', 'legitimate', 'legitimating', 'legit', 'legless',
    'leisurely', 'lengthways', 'lengthwise', 'lenient', 'leprous', 'lethal', 'lethargic', 'lettered',
    'level pegging', 'level', 'lewd', 'liable', 'libelous', 'libertine', 'libidinous', 'licentious', 'licit',
    'lidded', 'lief', 'lifeless', 'lifelike', 'lighter than air', 'likable', 'likeable', 'likelier',
    'likeliest', 'likely', 'like', 'limber', 'limbless', 'limier', 'limiest', 'limited', 'limiting',
    'limitless', 'limpid', 'limp', 'limy', 'linked', 'lionhearted', 'lissome', 'lissom', 'listed', 'listless',
    'lit up', 'literate', 'lither', 'lithest', 'lithe', 'litigious', 'livable', 'liveable', 'lived',
    'livelier', 'liveliest', 'lively', 'liveried', 'livest', 'live', 'living', 'loaded', 'loathsome',
    'loath', 'local', 'lockable', 'loco', 'lodged', 'loftier', 'loftiest', 'lofty', 'logical', 'lonelier',
    'loneliest', 'lonely', 'lonesome', 'lone', 'longhair', 'longing', 'looney', 'loonier', 'looniest',
    'loonies', 'loony', 'loopy', 'looser', 'loosest', 'loose', 'loquacious', 'lordlier', 'lordliest',
    'lordly', 'lorn', 'losing', 'lost', 'loth', 'loud', 'lounging', 'lousier', 'lousiest', 'lousy',
    'loutish', 'louvered', 'louvred', 'lovable', 'loveable', 'loveless', 'lovelier', 'loveliest', 'lovelorn',
    'lovely', 'lovesick', 'loving', 'lowbrow', 'lowering', 'lower', 'lowlier', 'lowliest', 'lowly',
    'loyal', 'lucid', 'luckier', 'luckiest', 'luckless', 'lucky', 'lucrative', 'ludicrous', 'lugubrious',
    'lukewarm', 'lumbering', 'luminescent', 'luminous', 'lumpier', 'lumpiest', 'lumpish', 'lumpy', 'lunatic',
    'lurid', 'luscious', 'lush', 'lustier', 'lustiest', 'lustrous', 'luxuriant', 'luxurious', 'macabre',
    'madcap', 'maddening', 'maddest', 'made', 'mad', 'magical', 'magic', 'magisterial', 'magnanimous',
    'magnificent', 'maidenly', 'mailed', 'mainstream', 'maintainable', 'main', 'majestic', 'major',
    'makeshift', 'maladjusted', 'maladroit', 'malcontent', 'malevolent', 'malicious', 'malignant', 'malign',
    'malleable', 'malnourished', 'malodorous', 'manageable', 'mandatory', 'maneuverable', 'manful', 'mangier',
    'mangiest', 'mangy', 'maniacal', 'manic', 'manifest', 'manifold', 'manlier', 'manliest', 'manly',
    'manned', 'mannered', 'mannerly', 'mannish', 'marauding', 'marginal', 'marked', 'marketable', 'marriageable',
    'married', 'marshier', 'marshiest', 'marshy', 'marvellous', 'marvelous', 'masked', 'masochistic',
    'masterful', 'masterly', 'matchless', 'matronly', 'matted', 'matt', 'maudlin', 'mawkish', 'maximal',
    'maximum', 'mealier', 'mealiest', 'mealy', 'meaningful', 'meaningless', 'mean', 'measlier', 'measliest',
    'measly', 'measurable', 'measured', 'measureless', 'meatier', 'meatiest', 'meaty', 'meddlesome',
    'mediocre', 'medley', 'meek', 'meet', 'melancholic', 'melancholy', 'mellifluous', 'mellow', 'melodious',
    'melodramatic', 'memorable', 'mendicant', 'menial', 'mercenary', 'merciful', 'merciless', 'mercurial',
    'merest', 'meretricious', 'mere', 'merited', 'meritorious', 'merrier', 'merriest', 'merry', 'messier',
    'messiest', 'messy', 'meteoric', 'methodical', 'meticulous', 'mettlesome', 'middlebrow', 'middle',
    'middling', 'midmost', 'midway', 'mid', 'miffed', 'mightier', 'mightiest', 'mighty', 'migrant',
    'mild', 'militant', 'milkier', 'milkiest', 'milled', 'millionth', 'minatory', 'mincing', 'minded',
    'mindful', 'mindless', 'minor', 'minus', 'miraculous', 'mirthful', 'mirthless', 'misapplied', 'misbegotten',
    'miscellaneous', 'mischievous', 'miscreant', 'miserable', 'miserly', 'misguided', 'misleading', 'misogynistic',
    'missing', 'mistaken', 'mistier', 'mistiest', 'mistrustful', 'misty', 'misunderstood', 'mitered',
    'mixed', 'mobile', 'mock', 'moderate', 'modest', 'modifiable', 'modish', 'mod', 'moist', 'moldy',
    'molten', 'momentous', 'moneyed', 'mongrel', 'monied', 'monolithic', 'monotonous', 'monstrous', 'moodier',
    'moodiest', 'moody', 'mooned', 'moonlit', 'moonstruck', 'moot', 'moralistic', 'moral', 'morbid',
    'mordant', 'moribund', 'moronic', 'morose', 'mortal', 'mossier', 'mossiest', 'mossy', 'motherless',
    'motherly', 'motionless', 'motley', 'mouldier', 'mouldiest', 'mouldy', 'mounted', 'mournful', 'mousey',
    'mousier', 'mousiest', 'mousy', 'mouthwatering', 'movable', 'moveable', 'moving', 'muckier', 'muckiest',
    'mucking', 'mucky', 'muddier', 'muddiest', 'muddy', 'muggier', 'muggiest', 'muggy', 'mulish',
    'multifaceted', 'multifarious', 'multiple', 'multitudinous', 'mum', 'mundane', 'munificent', 'murderous',
    'murky', 'murk', 'mushier', 'mushiest', 'mushy', 'muskier', 'muskiest', 'musky', 'mussier', 'mussiest',
    'mussy', 'mustier', 'mustiest', 'musty', 'mutable', 'mute', 'mutinous', 'mutual', 'myopic', 'myriad',
    'mysterious', 'nagging', 'naive', 'naked', 'nameless', 'nappier', 'nappiest', 'nappy', 'narcissistic',
    'nastier', 'nastiest', 'nasty', 'nattier', 'nattiest', 'natty', 'natural', 'naughtier', 'naughtiest',
    'naughty', 'naught', 'nauseating', 'nauseous', 'navigable', 'nearby', 'neat', 'nebulous', 'necessary',
    'needful', 'needier', 'neediest', 'needless', 'needy', 'nefarious', 'negative', 'neglectful', 'negligent',
    'negligible', 'negotiable', 'neighborly', 'neighbourly', 'nerveless', 'nervous', 'nervy', 'nested',
    'nether', 'nettlesome', 'nett', 'net', 'neurotic', 'newsier', 'newsiest', 'newsworthy', 'newsy',
    'next door', 'next', 'nicer', 'nicest', 'nice', 'niftier', 'niftiest', 'nifty', 'niggling', 'nightmarish',
    'nigh', 'nimble', 'nineteenth', 'ninetieth', 'ninth', 'nipping', 'nippy', 'nobler', 'noblest', 'noble',
    'noiseless', 'noisier', 'noisiest', 'noisome', 'noisy', 'nomadic', 'nominal', 'nonabrasive', 'nonabsorbent',
    'nonaligned', 'nonbreakable', 'nonchalant', 'noncommittal', 'noncompetitive', 'noncontagious', 'nondescript',
    'nonempty', 'nonessential', 'nonexistent', 'nonfatal', 'nonfat', 'nonflammable', 'nonhazardous',
    'nonmalignant', 'nonnegotiable', 'nonpareil', 'nonpoisonous', 'nonproductive', 'nonrefillable', 'nonrenewable',
    'nonrestrictive', 'nonreturnable', 'nonrigid', 'nonscheduled', 'nonsensical', 'nonstandard', 'nonstick',
    'nonstop', 'nontoxic', 'nontransferable', 'nontrivial', 'nonzero', 'normal', 'northbound', 'nosier',
    'nosiest', 'nosy', 'notable', 'noted', 'noteworthy', 'noticeable', 'notorious', 'noxious', 'nth',
    'nubile', 'nude', 'null', 'number one', 'numberless', 'numbing', 'numb', 'numerate', 'numerous',
    'nutritious', 'nuts', 'nutty', 'oafish', 'oared', 'obdurate', 'obedient', 'obeisant', 'obese',
    'objectionable', 'objective', 'obligate', 'obligatory', 'obliging', 'oblivious', 'obnoxious', 'obscene',
    'obscure', 'obsequious', 'observable', 'observant', 'obsessive', 'obstinate', 'obstreperous', 'obstructive',
    'obtrusive', 'obtuse', 'obverse', 'obvious', 'occasional', 'oddball', 'odd', 'odious', 'odoriferous',
    'odorless', 'odorous', 'odourless', 'off color', 'off key', 'off limits', 'offbeat', 'offensive',
    'offhand', 'officious', 'offshore', 'offside', 'off', 'often', 'oilier', 'oiliest', 'oily', 'okay',
    'ominous', 'omnipotent', 'omnipresent', 'omniscient', 'on key', 'oncoming', 'onerous', 'ongoing',
    'only', 'onrushing', 'onshore', 'onward', 'on', 'opaque', 'open', 'operable', 'opinionated', 'opportune',
    'opportunistic', 'opportunist', 'opposite', 'oppressive', 'opprobrious', 'optimal', 'optimistic',
    'optimum', 'optional', 'opulent', 'oracular', 'orderly', 'ordinary', 'ornamented', 'ornate', 'ornery',
    'orotund', 'orthodox', 'or', 'ossified', 'ostensible', 'otherwise', 'otherworldly', 'otiose', 'outbound',
    'outcast', 'outermost', 'outer', 'outgoing', 'outlandish', 'outlying', 'outrageous', 'outright',
    'outside', 'outspoken', 'outspread', 'outstanding', 'outward', 'overabundant', 'overactive', 'overall',
    'overambitious', 'overanxious', 'overbearing', 'overblown', 'overcast', 'overcautious', 'overdue',
    'overeager', 'overenthusiastic', 'overgenerous', 'overhand', 'overhead', 'overland', 'overmuch',
    'overpowering', 'overriding', 'overripe', 'oversexed', 'overshot', 'overstayed', 'overstuffed', 'overt',
    'overweening', 'overwhelming', 'overwrought', 'overzealous', 'over', 'owing', 'owlish', 'paced',
    'pacific', 'pained', 'painful', 'painless', 'painstaking', 'painted', 'palatable', 'palatial', 'palmier',
    'palmiest', 'palmy', 'palpable', 'paltrier', 'paltriest', 'paltry', 'panicky', 'paradoxical', 'paralytic',
    'paramount', 'paranoid', 'paranormal', 'paraplegic', 'parasitic', 'pardonable', 'parted', 'partial',
    'particular', 'parting', 'partisan', 'partizan', 'par', 'passable', 'passed', 'passing', 'passionate',
    'passionless', 'passive', 'pass', 'pastier', 'pastiest', 'pasties', 'pasty', 'patchier', 'patchiest',
    'patchy', 'patent', 'pathetic', 'pathogenic', 'pathological', 'patient', 'patriotic', 'patronising',
    'pat', 'paunchy', 'payable', 'peaceable', 'peaceful', 'pearlier', 'pearliest', 'pearly', 'pebbly',
    'peculiar', 'pedantic', 'pedigreed', 'peerless', 'peeved', 'peevish', 'pejorative', 'pellucid', 'pelting',
    'pendent', 'pendulous', 'penetrating', 'penetrative', 'penitent', 'penniless', 'pensive', 'penultimate',
    'penurious', 'peppery', 'peppier', 'peppiest', 'peppy', 'perceivable', 'perceptible', 'perceptive',
    'peremptory', 'perfectible', 'perfect', 'perfidious', 'perforated', 'perforate', 'perfunctory', 'perilous',
    'peripatetic', 'peripheral', 'perishable', 'perished', 'perishing', 'perjured', 'perkier', 'perkiest',
    'perky', 'perk', 'permeable', 'permissible', 'permissive', 'pernicious', 'perplexed', 'persevering',
    'persistent', 'persnickety', 'personable', 'personal', 'perspicacious', 'perspicuous', 'persuasive',
    'pertinacious', 'pertinent', 'pert', 'pervasive', 'perverse', 'perverted', 'peskier', 'peskiest',
    'pesky', 'pestilent', 'pettier', 'pettiest', 'pettifogging', 'petty', 'petulant', 'phenomenal',
    'philanthropic', 'phlegmatic', 'phoney', 'phonier', 'phoniest', 'phonies', 'phony', 'phosphorescent',
    'photogenic', 'photosensitive', 'picayune', 'picked', 'pickier', 'pickiest', 'pickled', 'picky',
    'picturesque', 'piddling', 'piecemeal', 'piercing', 'piggish', 'piggy', 'piled', 'pious', 'piping',
    'piquant', 'piratical', 'pissed', 'piteous', 'pithy', 'pitiable', 'pitiful', 'pitiless', 'pivotal',
    'placid', 'plaintive', 'plain', 'plangent', 'plastered', 'plated', 'platitudinous', 'plausible',
    'playable', 'playful', 'pleasant', 'pleasing', 'pleasurable', 'plebeian', 'plenary', 'plenteous',
    'plentiful', 'pliable', 'pliant', 'pluckier', 'pluckiest', 'plucky', 'plumb', 'plusher', 'plushest',
    'plush', 'plus', 'pocked', 'pockmarked', 'poignant', 'pointless', 'poised', 'poisonous', 'pokey',
    'pokier', 'pokiest', 'poky', 'polished', 'polite', 'politic', 'polled', 'polluted', 'poltroon',
    'pompous', 'ponderous', 'poorly', 'poor', 'pops', 'popular', 'populous', 'porous', 'portable',
    'portentous', 'posh', 'positive', 'possessed', 'possessive', 'possible', 'posterior', 'potable',
    'potential', 'potent', 'potted', 'pottier', 'pottiest', 'potty', 'powdery', 'powered', 'powerful',
    'powerless', 'practicable', 'practical', 'practised', 'pragmatic', 'praiseworthy', 'preachier',
    'preachiest', 'preachy', 'precarious', 'precious', 'precipitant', 'precipitate', 'precipitous', 'precise',
    'precocious', 'predatory', 'predictable', 'predominant', 'predominate', 'preeminent', 'preemptive',
    'preferable', 'preferential', 'pregnant', 'prejudicial', 'preliminary', 'premier', 'premonitory',
    'preoccupied', 'prepared', 'preponderant', 'prepossessing', 'preposterous', 'prerequisite', 'prescient',
    'presentable', 'preshrunk', 'pressing', 'prestigious', 'presumable', 'presumptive', 'presumptuous',
    'pretended', 'pretentious', 'preternatural', 'prettied', 'prettier', 'prettiest', 'prettying', 'pretty',
    'prevailing', 'prevalent', 'priceless', 'pricey', 'pricklier', 'prickliest', 'prickly', 'priestlier',
    'priestliest', 'primal', 'primary', 'prime', 'prim', 'princelier', 'princeliest', 'princely', 'principal',
    'principled', 'printable', 'prissy', 'pristine', 'private', 'privier', 'priviest', 'privies', 'privileged',
    'privy', 'probable', 'problematic', 'prodigal', 'prodigious', 'productive', 'profane', 'professed',
    'proficient', 'profitable', 'profligate', 'profound', 'profuse', 'progressive', 'prohibitive', 'prohibitory',
    'prolific', 'prolix', 'prominent', 'promiscuous', 'promising', 'prompt', 'prone', 'pronounceable',
    'pronounced', 'proof', 'propertied', 'proper', 'prophetic', 'propitious', 'proportionate', 'proportioned',
    'prosaic', 'prospective', 'prosperous', 'prostrate', 'prosy', 'protean', 'protuberant', 'proud',
    'provable', 'proven', 'providential', 'provident', 'provisional', 'provocative', 'pro', 'prudential',
    'prudent', 'prudish', 'prurient', 'prying', 'pseudo', 'psychotic', 'psycho', 'public', 'puerile',
    'puffier', 'puffiest', 'puffy', 'pugnacious', 'pulpier', 'pulpiest', 'pulpy', 'punchier', 'punchiest',
    'punchy', 'punctilious', 'punctual', 'pungent', 'punishable', 'punk', 'purblind', 'purchasable',
    'purebred', 'purer', 'purest', 'pure', 'puritanical', 'purposeful', 'purposeless', 'pursuant', 'purulent',
    'pushed', 'pushier', 'pushiest', 'pushing', 'pushy', 'pusillanimous', 'pussier', 'pussiest', 'put up',
    'putative', 'putrescent', 'putrid', 'quadruple', 'quadruplicate', 'quaint', 'qualified', 'quarrelsome',
    'quartered', 'quarter', 'quavery', 'queasier', 'queasiest', 'queasy', 'queenlier', 'queenliest',
    'queenly', 'querulous', 'questionable', 'questioning', 'quibbling', 'quick', 'quiescent', 'quiet',
    'quintessential', 'quintuple', 'quit', 'quixotic', 'quizzical', 'quotable', 'rabid', 'racier', 'raciest',
    'racist', 'racy', 'radiant', 'radiate', 'radical', 'raffish', 'raggedy', 'ragged', 'rainier', 'rainiest',
    'rainy', 'raised', 'raked', 'rakish', 'rambunctious', 'rampant', 'ramshackle', 'rancid', 'rancorous',
    'random', 'randy', 'ranged', 'rangier', 'rangiest', 'rangy', 'ranking', 'rank', 'rapacious', 'rapid',
    'rapturous', 'rapt', 'rarefied', 'rarer', 'rarest', 'rare', 'raring', 'rascally', 'rascal', 'rash',
    'raspier', 'raspiest', 'rasping', 'raspy', 'rational', 'rattier', 'rattiest', 'ratty', 'raucous',
    'raunchy', 'ravening', 'ravenous', 'raving', 'rawboned', 'raw', 'reachable', 'reactionary', 'reactive',
    'readable', 'readier', 'readiest', 'readying', 'ready', 'read', 'realisable', 'realistic', 'realizable',
    'realizing', 'real', 'rearmost', 'rearward', 'reasonable', 'reasoned', 'rebellious', 'recalcitrant',
    'receivable', 'receptive', 'rechargeable', 'reckless', 'recluse', 'reclusive', 'recognisable', 'recognizable',
    'recollected', 'reconcilable', 'recondite', 'reconstituted', 'reconstructed', 'recoverable', 'recreant',
    'recumbent', 'recurrent', 'redeemable', 'redeeming', 'redolent', 'redoubtable', 'reduced', 'redundant',
    'reedier', 'reediest', 'reedy', 'refillable', 'refined', 'reflective', 'reformed', 'refractory',
    'refreshing', 'refulgent', 'refundable', 'regal', 'regardless', 'registered', 'regressive', 'regretful',
    'regrettable', 'regular', 'related', 'relative', 'releasable', 'relentless', 'relevant', 'reliable',
    'reliant', 'reluctant', 'remarkable', 'remediable', 'reminiscent', 'remiss', 'remnant', 'remorseful',
    'remorseless', 'remoter', 'remotest', 'remote', 'removable', 'removed', 'renascent', 'renowned',
    'repairable', 'repayable', 'repeatable', 'repeated', 'repellent', 'repentant', 'repent', 'repetitious',
    'repetitive', 'replete', 'reposeful', 'reprehensible', 'repressive', 'reproachful', 'reprobate',
    'reprocessed', 'reproducible', 'repugnant', 'repulsive', 'reputable', 'reputed', 'requisite', 'resentful',
    'reserved', 'residual', 'resigned', 'resilient', 'resistant', 'resolute', 'resolved', 'resonant',
    'resourceful', 'respectable', 'respectful', 'respective', 'resplendent', 'responsible', 'responsive',
    'restful', 'resting', 'restive', 'restless', 'restricted', 'restrictive', 'resultant', 'resurgent',
    'retarded', 'retentive', 'reticent', 'retiring', 'retractable', 'retrievable', 'retroactive', 'retrograde',
    'retrogressive', 'returnable', 'reusable', 'revengeful', 'reverential', 'reverent', 'reverse', 'reversible',
    'revocable', 'revolting', 'revolving', 'rewarding', 'rheumatic', 'rheumy', 'ribald', 'rich', 'rickety',
    'ridden', 'ridiculous', 'rife', 'right about', 'righteous', 'rightful', 'right', 'rigid', 'rigorous',
    'ringed', 'riotous', 'ripe', 'ripping', 'risible', 'rising', 'riskier', 'riskiest', 'risky', 'ritzier',
    'ritziest', 'ritzy', 'riven', 'roadworthy', 'roaring', 'robust', 'rockier', 'rockiest', 'rocky',
    'roguish', 'rollicking', 'rolling', 'romantic', 'rooted', 'rootless', 'rotten', 'roughshod', 'rough',
    'rousing', 'routine', 'rowdy', 'rude', 'rudimentary', 'rueful', 'ruffed', 'ruffled', 'rugged', 'ruinous',
    'rummy', 'rum', 'run down', 'runnier', 'runniest', 'runny', 'rush', 'rustier', 'rustiest', 'rustproof',
    'ruthless', 'saccharine', 'sacred', 'sacrilegious', 'sacrosanct', 'sadistic', 'sadist', 'sad', 'safe',
    'sagacious', 'sage', 'said', 'saintlier', 'saintliest', 'saintly', 'salable', 'salacious', 'salaried',
    'saleable', 'salient', 'salted', 'saltier', 'salty', 'salubrious', 'salutary', 'salvageable', 'same',
    'sanctified', 'sanctimonious', 'sanded', 'sandier', 'sandiest', 'saner', 'sanest', 'sane', 'sanguinary',
    'sanguine', 'sanitary', 'sapient', 'sappier', 'sappiest', 'sappy', 'sap', 'sarcastic', 'sardonic',
    'sassier', 'sassy', 'satanic', 'satiny', 'satisfactory', 'satisfied', 'saturated', 'saturate', 'saturnine',
    'saucier', 'sauciest', 'saucy', 'savage', 'savorier', 'savoriest', 'savourier', 'savouriest', 'savoury',
    'savvy', 'scabbier', 'scabbiest', 'scabby', 'scabrous', 'scaled', 'scalier', 'scaliest', 'scaly',
    'scarcer', 'scarcest', 'scarce', 'scary', 'scathing', 'scatterbrained', 'sceptical', 'sceptic', 'scheming',
    'schismatic', 'schizoid', 'schizophrenic', 'schlock', 'schmaltzy', 'schmalzy', 'scoreless', 'scornful',
    'scraggly', 'scrappier', 'scrappiest', 'scrappy', 'scratchier', 'scratchiest', 'scratchy', 'scratch',
    'screeching', 'screwball', 'screwed', 'screwy', 'scrimp', 'scrubbed', 'scrubbier', 'scrubbiest',
    'scrubby', 'scrub', 'scruffier', 'scruffiest', 'scruffy', 'scrumptious', 'scrupulous', 'scummier',
    'scummiest', 'scummy', 'scurrilous', 'scurry', 'sealed', 'seamier', 'seamiest', 'seamless', 'seamy',
    'searching', 'sear', 'seasick', 'seasonable', 'seaward', 'seaworthy', 'secluded', 'seclusive', 'secondary',
    'second', 'secretive', 'secret', 'secure', 'sedate', 'sedentary', 'seditious', 'seductive', 'sedulous',
    'seedier', 'seediest', 'seedless', 'seedy', 'seeming', 'seemlier', 'seemliest', 'seemly', 'selective',
    'select', 'selfish', 'selfless', 'selfsame', 'self', 'semiconscious', 'semipermeable', 'semiprecious',
    'semiprivate', 'semiretired', 'semiskilled', 'sensational', 'senseless', 'sensible', 'sensitive',
    'sensual', 'sensuous', 'sententious', 'sentient', 'sentimental', 'separable', 'separate', 'sepulchral',
    'sequential', 'sequestered', 'sequined', 'seraphic', 'serene', 'sere', 'serious', 'serried', 'serviceable',
    'servile', 'set in', 'set', 'seventeenth', 'seventh', 'seventieth', 'several', 'severer', 'severest',
    'severe', 'sexed', 'sexier', 'sexiest', 'sexist', 'sexless', 'sexy', 'shabbier', 'shabbiest', 'shabby',
    'shadowed', 'shadowy', 'shady', 'shaggier', 'shaggiest', 'shaggy', 'shakier', 'shakiest', 'shaky',
    'shamefaced', 'shameful', 'shameless', 'sham', 'sharable', 'shareable', 'sharp', 'shatterproof',
    'shaven', 'sheared', 'sheen', 'sheepish', 'sheer', 'shelled', 'shiftier', 'shiftiest', 'shiftless',
    'shifty', 'shill', 'shimmery', 'shinier', 'shiniest', 'shiny', 'shipshape', 'shittier', 'shittiest',
    'shitty', 'shivery', 'shoal', 'shocking', 'shockproof', 'shock', 'shoddy', 'shopworn', 'shot', 'showery',
    'showier', 'showiest', 'showy', 'shrewd', 'shrewish', 'shrill', 'shrinkable', 'shrubbier', 'shrubbiest',
    'shrubby', 'shrunken', 'shuddering', 'shut', 'shyer', 'shyest', 'shy', 'sickening', 'sicker', 'sicklier',
    'sickliest', 'sickly', 'sick', 'sic', 'sidelong', 'sidesplitting', 'sideways', 'side', 'sighted',
    'sightless', 'significant', 'silent', 'silly', 'similar', 'simpatico', 'simple', 'simplistic', 'simulated',
    'simultaneous', 'sincere', 'sinewy', 'sinful', 'singled', 'single', 'singling', 'singular', 'sinister',
    'sisterly', 'situate', 'sixteenth', 'sixteen', 'sixth', 'sixtieth', 'skeptical', 'skeptic', 'sketchy',
    'skilful', 'skilled', 'skillful', 'skinless', 'skinned', 'skintight', 'skittish', 'skyward', 'slack',
    'slangier', 'slangiest', 'slangy', 'slantwise', 'slapdash', 'slaphappy', 'slashing', 'slatternly',
    'slavish', 'sleazier', 'sleaziest', 'sleazy', 'sleek', 'sleepier', 'sleepiest', 'sleepless', 'sleepy',
    'sleety', 'sleeveless', 'slick', 'sliding', 'slier', 'sliest', 'slighting', 'slimier', 'slimiest',
    'slimming', 'slimy', 'slinkier', 'slinkiest', 'slinky', 'slipperier', 'slipperiest', 'slippery',
    'slipshod', 'slithery', 'sloppier', 'sloppiest', 'sloppy', 'sloshed', 'slothful', 'slouchier', 'slouchiest',
    'slouchy', 'slovenlier', 'slovenliest', 'slovenly', 'slow', 'sluggard', 'sluggish', 'slumberous',
    'slung', 'slushier', 'slushiest', 'slushy', 'sluttish', 'sly', 'smacking', 'smarmy', 'smart', 'smashed',
    'smashing', 'smellier', 'smelliest', 'smelly', 'smokeless', 'smokier', 'smokiest', 'smoky', 'smooth',
    'smugger', 'smuggest', 'smug', 'smuttier', 'smuttiest', 'smutty', 'snakier', 'snakiest', 'snaky',
    'snappier', 'snappiest', 'snappy', 'snazzier', 'snazziest', 'snazzy', 'sneakier', 'sneakiest', 'sneaking',
    'sneaky', 'snider', 'snidest', 'snide', 'snippier', 'snippiest', 'snippy', 'snobbish', 'snoopier',
    'snoopiest', 'snoopy', 'snootier', 'snootiest', 'snooty', 'snotty', 'snowbound', 'snowier', 'snowiest',
    'snub', 'snugger', 'snuggest', 'snugging', 'snug', 'soapier', 'soapiest', 'soapy', 'soaring', 'sober',
    'sociable', 'sodden', 'softhearted', 'soft', 'soggy', 'sold', 'solemn', 'sole', 'solicitous', 'solid',
    'solitary', 'soluble', 'solvable', 'somnolent', 'sonorous', 'sooth', 'sophisticated', 'sophomoric',
    'soporific', 'soppier', 'soppiest', 'sopping', 'soppy', 'sordid', 'sorer', 'sorest', 'sore', 'sorrier',
    'sorriest', 'sorry', 'sottish', 'soulful', 'soulless', 'sounding', 'soundless', 'soundproof', 'sound',
    'soupier', 'soupiest', 'soupy', 'sour', 'southbound', 'so', 'spaced out', 'spanking', 'spare', 'sparing',
    'sparser', 'sparsest', 'sparse', 'spasmodic', 'spastic', 'special', 'specifiable', 'specific', 'specious',
    'spectacular', 'speculative', 'spec', 'speechless', 'speedier', 'speediest', 'speedy', 'spellbound',
    'spendthrift', 'spent', 'spicier', 'spiciest', 'spicy', 'spidery', 'spiffier', 'spiffiest', 'spiffy',
    'spikier', 'spikiest', 'spiky', 'spindlier', 'spindliest', 'spindling', 'spindly', 'spineless', 'spinier',
    'spiniest', 'spiny', 'spirited', 'spiritless', 'spiteful', 'splashier', 'splashiest', 'splashy',
    'splendid', 'splenetic', 'splitting', 'spoken', 'spongier', 'spongiest', 'spongy', 'spontaneous',
    'spookier', 'spookiest', 'spooky', 'sporadic', 'sportier', 'sportiest', 'sportive', 'sportsmanlike',
    'sporty', 'spotless', 'spotty', 'spouted', 'spread', 'sprier', 'spriest', 'sprightlier', 'sprightliest',
    'sprightly', 'springier', 'springiest', 'springy', 'sprucer', 'sprucest', 'spruce', 'sprucing',
    'spryer', 'spryest', 'spry', 'spunkier', 'spunkiest', 'spunky', 'spun', 'spurious', 'spurred', 'squab',
    'squalid', 'squashier', 'squashiest', 'squashy', 'squeakier', 'squeakiest', 'squeaky', 'squeamish',
    'squint', 'squirmier', 'squirmiest', 'squirmy', 'squishier', 'squishiest', 'squishy', 'stable',
    'stacked', 'staged', 'stagnant', 'staid', 'stainless', 'stalked', 'stalwart', 'standard', 'standing',
    'standoffish', 'standout', 'starchy', 'stark', 'starless', 'starred', 'starrier', 'starriest', 'starry',
    'star', 'stated', 'stateless', 'statelier', 'stateliest', 'stately', 'statesmanlike', 'static', 'stationary',
    'statuesque', 'staunch', 'steadfast', 'steadier', 'steadiest', 'steady', 'stealthier', 'stealthiest',
    'stealthy', 'steamier', 'steamiest', 'steamy', 'steep', 'stemmed', 'stentorian', 'stereotyped', 'sterile',
    'stern', 'stewed', 'stickier', 'stickiest', 'sticky', 'stiff', 'stifling', 'still', 'stilted', 'stingy',
    'stinking', 'stirring', 'stock', 'stodgier', 'stodgiest', 'stodgy', 'stoical', 'stoic', 'stolidity',
    'stolid', 'stoned', 'stoney', 'stonier', 'stoniest', 'stony', 'stoppable', 'stopped', 'stopping',
    'storied', 'stormier', 'stormiest', 'stormy', 'straightforward', 'strained', 'strait', 'strangest',
    'strange', 'strapless', 'strapped', 'stray', 'streakier', 'streakiest', 'streaky', 'strenuous',
    'stressful', 'stretchier', 'stretchiest', 'stretchy', 'stricken', 'strict', 'strident', 'striking',
    'stringent', 'stringy', 'strong', 'struck', 'strung out', 'strung', 'strutting', 'stubbly', 'stubborn',
    'stuck', 'studied', 'studious', 'stuffed', 'stuffy', 'stung', 'stunning', 'stupid', 'sturdier',
    'sturdiest', 'sturdy', 'stylish', 'suave', 'subdued', 'sublime', 'submerged', 'submersible', 'submissive',
    'subnormal', 'subordinate', 'subservient', 'substandard', 'subtle', 'subversive', 'successful', 'successive',
    'succinct', 'succulent', 'suchlike', 'sudden', 'sufficient', 'sugared', 'sugarless', 'sugary', 'suggestible',
    'suggestive', 'suicidal', 'suitable', 'suited', 'sulkier', 'sulkiest', 'sulkies', 'sulky', 'sullen',
    'sultrier', 'sultriest', 'sultry', 'sumptuous', 'sung', 'sunken', 'sunk', 'sunless', 'sunlit', 'sunnier',
    'sunniest', 'sunny', 'superb', 'supercilious', 'superficial', 'superfluous', 'superhuman', 'superimposed',
    'superior', 'superlative', 'supernatural', 'supernumerary', 'superstitious', 'super', 'supine', 'suppler',
    'supplest', 'supple', 'suppliant', 'supplicant', 'supportable', 'supposed', 'supreme', 'surer', 'surest',
    'sure', 'surly', 'surmountable', 'surpassing', 'surplus', 'surprising', 'surreal', 'surreptitious',
    'surrounding', 'susceptible', 'suspect', 'suspicious', 'sustainable', 'svelter', 'sveltest', 'svelte',
    'swaggering', 'swagger', 'swampier', 'swampiest', 'swampy', 'swankier', 'swankiest', 'swanky', 'swank',
    'swashbuckling', 'sweatier', 'sweatiest', 'sweaty', 'sweeping', 'sweet', 'swellheaded', 'swell', 'sweltering',
    'swift', 'swindled', 'swinish', 'swish', 'swollen', 'sworn', 'sycophantic', 'sympathetic', 'syrupy',
    'systematic', 'taboo', 'tabu', 'taciturn', 'tacit', 'tackier', 'tackiest', 'tacky', 'tactful', 'tactless',
    'tailless', 'tailored', 'taking', 'talkative', 'tameable', 'tamed', 'tamer', 'tamest', 'tame', 'taming',
    'tangible', 'tangier', 'tangiest', 'tangled', 'tangy', 'tanked', 'tantalizing', 'tardier', 'tardiest',
    'tardy', 'tart', 'tasteful', 'tasteless'
  ],
  size: [
    'big', 'small', 'tiny', 'huge', 'large', 'little', 'enormous', 'gigantic', 'microscopic', 'massive',
    'miniature', 'colossal', 'immense', 'petite', 'vast', 'compact', 'spacious', 'cramped', 'broad',
    'narrow', 'wide', 'thin', 'thick', 'fat', 'skinny', 'tall', 'short', 'high', 'low', 'deep', 'shallow',
    'long', 'brief', 'extensive', 'limited', 'infinite', 'finite', 'several', 'abundant', 'ample',
    'bulky', 'chubby', 'heavy', 'light', 'lean', 'mammoth', 'plump', 'puny', 'scrawny', 'slight',
    'substantial', 'tremendous', 'voluminous', 'weighty',
    // Extended size adjectives from user request
    'ampler', 'amplest', 'beefier', 'beefiest', 'beefy', 'bigger', 'biggest', 'burly', 'capacious',
    'cavernous', 'chubbier', 'chubbiest', 'chunky', 'chunkier', 'chunkiest', 'commodious', 'corpulent',
    'denser', 'densest', 'dense', 'diminutive', 'dinkier', 'dinkiest', 'dinkies', 'dinky', 'elephantine',
    'fatter', 'fattest', 'full', 'gargantuan', 'giant', 'hairbreadth', 'half', 'heavier', 'heaviest',
    'heavies', 'heavyset', 'heftier', 'heftiest', 'hefty', 'huger', 'hugest', 'hulking', 'infinitesimal',
    'lanky', 'lank', 'larger', 'largest', 'lengthier', 'lengthiest', 'lengthy', 'lesser', 'lightweight',
    'longish', 'lowish', 'macroscopic', 'meager', 'meagre', 'medium', 'minimal', 'minimum', 'mini',
    'minuscule', 'minutely', 'minute', 'monumental', 'mountainous', 'much', 'outsize', 'overlong',
    'oversize', 'overweight', 'peewee', 'portlier', 'portliest', 'portly', 'pudgy', 'punier', 'puniest',
    'roomier', 'roomiest', 'roomy', 'scantier', 'scantiest', 'scanty', 'scant', 'scrawnier', 'scrawniest',
    'shortish', 'sizable', 'sizeable', 'sized', 'skimpy', 'skinnier', 'skinniest', 'slender', 'slimmer',
    'slimmest', 'slim', 'smallish', 'stockier', 'stockiest', 'stocky', 'stout', 'strapping', 'stubby',
    'stumpier', 'stumpiest', 'stumpy', 'stupendous', 'subatomic', 'teenier', 'teeniest', 'teensy',
    'teeny', 'thickset', 'tinier', 'tiniest', 'titanic', 'towering', 'tubbier', 'tubbiest', 'tubby',
    'undersized', 'undersize', 'underweight'
  ],
  age: [
    'old', 'new', 'ancient', 'modern', 'young', 'elderly', 'aged', 'fresh', 'recent', 'contemporary',
    'vintage', 'antique', 'historic', 'prehistoric', 'medieval', 'current', 'outdated', 'obsolete',
    'brand-new', 'secondhand', 'used', 'original', 'latest', 'former', 'previous', 'future', 'past',
    'present', 'archaic', 'primitive', 'advanced', 'cutting-edge', 'state-of-the-art',
    // Extended age adjectives from user request
    'adolescent', 'adult', 'after', 'ageless', 'ancestral', 'annual', 'antebellum', 'antecedent',
    'antediluvian', 'antiquated', 'autumnal', 'baby', 'biannual', 'bicentennial', 'biennial', 'bimonthly',
    'biweekly', 'bygone', 'centenarian', 'centenary', 'centennial', 'coeval', 'contemporaneous', 'daily',
    'dated', 'earliest', 'early', 'elder', 'eldest', 'embryonic', 'epochal', 'erstwhile', 'eternal',
    'eventual', 'everlasting', 'everyday', 'fortnightly', 'freshman', 'heretofore', 'hourly', 'immature',
    'immemorial', 'infantile', 'infant', 'interim', 'junior', 'juvenile', 'larval', 'lasting', 'later',
    'late', 'latter', 'lifelong', 'livelong', 'longtime', 'mature', 'mediaeval', 'millennial', 'momentary',
    'monthly', 'nascent', 'neonatal', 'newborn', 'newfangled', 'nightly', 'nonagenarian', 'novel',
    'obsolescent', 'octogenarian', 'olden', 'older', 'oldest', 'out of date', 'outmoded', 'outworn',
    'overage', 'overnight', 'perennial', 'periodic', 'permanent', 'perpetual', 'posthumous', 'precedent',
    'preceding', 'premature', 'preschool', 'prewar', 'primaeval', 'primeval', 'primordial', 'prior',
    'pubescent', 'quadrennial', 'quarterly', 'quondam', 'quotidian', 'reborn', 'seasonal', 'semiannual',
    'semimonthly', 'semiweekly', 'senile', 'senior', 'septuagenarian', 'sexagenarian', 'sometime',
    'space age', 'split second', 'stale', 'stillborn', 'subsequent', 'superannuated', 'teenage', 'teen',
    'temporary', 'tercentenary', 'then', 'timeless', 'timely', 'timeworn', 'traditional', 'transient',
    'transitory', 'triennial', 'unborn', 'undated', 'underage', 'unprecedented', 'untimely', 'venerable'
  ],
  shape: [
    'round', 'square', 'flat', 'curved', 'straight', 'circular', 'rectangular', 'triangular', 'oval',
    'spherical', 'cylindrical', 'conical', 'angular', 'pointed', 'blunt', 'sharp', 'smooth', 'rough',
    'bumpy', 'uneven', 'level', 'crooked', 'twisted', 'bent', 'stretched', 'compressed', 'hollow',
    'solid', 'dense', 'loose', 'tight', 'open', 'closed', 'narrow', 'wide'
  ],
  color: [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray',
    'grey', 'golden', 'silver', 'bronze', 'copper', 'crimson', 'scarlet', 'maroon', 'navy', 'royal',
    'sky', 'turquoise', 'teal', 'lime', 'olive', 'forest', 'emerald', 'violet', 'lavender', 'magenta',
    'rose', 'coral', 'salmon', 'beige', 'tan', 'cream', 'ivory', 'pearl', 'jet', 'charcoal', 'slate'
  ],
  origin: [
    'american', 'chinese', 'french', 'british', 'german', 'italian', 'japanese', 'spanish', 'russian',
    'indian', 'canadian', 'australian', 'mexican', 'brazilian', 'korean', 'thai', 'greek', 'turkish',
    'egyptian', 'moroccan', 'nigerian', 'south african', 'argentinian', 'chilean', 'peruvian', 'venezuelan',
    'european', 'asian', 'african', 'latin', 'nordic', 'scandinavian', 'mediterranean',
    'middle eastern', 'western', 'eastern', 'northern', 'southern', 'tropical', 'arctic', 'antarctic',
    'roman', 'celtic', 'viking', 'persian', 'byzantine', 'ottoman', 'mayan', 'aztec', 'egyptian',
    'babylonian', 'sumerian', 'phoenician', 'carthaginian', 'venetian', 'florentine', 'parisian', 'londoner',
    'new yorker', 'californian', 'texan', 'midwestern', 'southeastern', 'northwestern', 'southwestern'
  ],
  material: [
    'wooden', 'plastic', 'metal', 'metallic', 'cotton', 'silk', 'wool', 'leather', 'rubber', 'glass',
    'ceramic', 'stone', 'concrete', 'marble', 'granite', 'steel', 'iron', 'aluminum', 'copper', 'brass',
    'gold', 'silver', 'diamond', 'crystal', 'paper', 'cardboard', 'fabric', 'linen', 'velvet', 'satin',
    'denim', 'canvas', 'vinyl', 'foam', 'bamboo', 'cork', 'wicker', 'rattan', 'clay', 'porcelain',
    'embroidered', 'woven', 'knitted', 'crocheted', 'quilted', 'upholstered', 'lacquered', 'polished',
    'brushed', 'textured', 'smooth', 'rough', 'glossy', 'matte', 'shiny', 'dull', 'transparent', 'opaque',
    'rusty'
  ],
  participle: [
    // Present participles (verb + ing acting as adjectives)
    'running', 'walking', 'swimming', 'dancing', 'singing', 'playing', 'working', 'sleeping', 'eating',
    'drinking', 'cooking', 'reading', 'writing', 'driving', 'flying', 'sailing', 'hiking', 'camping',
    'hunting', 'fishing', 'gardening', 'painting', 'drawing', 'sewing', 'knitting', 'building', 'cleaning',
    'washing', 'ironing', 'folding', 'hanging', 'standing', 'sitting', 'lying', 'resting', 'relaxing',
    'thinking', 'dreaming', 'hoping', 'wishing', 'wanting', 'needing', 'loving', 'caring', 'helping',
    'supporting', 'encouraging', 'inspiring', 'motivating', 'exciting', 'thrilling', 'amazing', 'stunning',
    'shocking', 'surprising', 'alarming', 'warning', 'guiding', 'leading', 'following', 'chasing',
    'hunting', 'searching', 'looking', 'watching', 'listening', 'hearing', 'smelling', 'tasting', 'feeling',
    'touching', 'holding', 'gripping', 'squeezing', 'pulling', 'pushing', 'lifting', 'carrying', 'moving',
    'shaking', 'vibrating', 'spinning', 'rotating', 'turning', 'rolling', 'sliding', 'gliding', 'flowing',
    'streaming', 'rushing', 'racing', 'speeding', 'crawling', 'creeping', 'sneaking', 'tiptoeing',
    'jumping', 'leaping', 'bouncing', 'hopping', 'skipping', 'marching', 'stomping', 'stamping',
    'kicking', 'punching', 'hitting', 'slapping', 'patting', 'stroking', 'rubbing', 'scratching',
    'tickling', 'poking', 'prodding', 'pressing', 'squashing', 'crushing', 'breaking', 'cracking',
    'splitting', 'tearing', 'ripping', 'cutting', 'slicing', 'chopping', 'grinding', 'mixing', 'stirring',
    'whipping', 'beating', 'kneading', 'molding', 'shaping', 'forming', 'creating', 'making', 'producing',
    'manufacturing', 'assembling', 'constructing', 'building', 'designing', 'planning', 'organizing',
    'arranging', 'decorating', 'beautifying', 'cleaning', 'polishing', 'shining', 'gleaming', 'sparkling',
    'glittering', 'twinkling', 'flickering', 'flashing', 'blinking', 'winking', 'smiling', 'laughing',
    'giggling', 'chuckling', 'grinning', 'frowning', 'scowling', 'pouting', 'crying', 'weeping', 'sobbing',
    'sniffling', 'sneezing', 'coughing', 'yawning', 'stretching', 'bending', 'twisting', 'curving',
    // Past participles (verb + ed/irregular acting as adjectives)
    'broken', 'cracked', 'damaged', 'ruined', 'destroyed', 'demolished', 'wrecked', 'shattered', 'smashed',
    'crushed', 'bent', 'twisted', 'warped', 'distorted', 'torn', 'ripped', 'cut', 'sliced', 'chopped',
    'ground', 'mixed', 'stirred', 'whipped', 'beaten', 'kneaded', 'molded', 'shaped', 'formed', 'created',
    'made', 'produced', 'manufactured', 'assembled', 'constructed', 'built', 'designed', 'planned',
    'organized', 'arranged', 'decorated', 'cleaned', 'polished', 'shined', 'washed', 'ironed', 'folded',
    'hung', 'dried', 'cooked', 'baked', 'fried', 'grilled', 'roasted', 'boiled', 'steamed', 'sautéed',
    'seasoned', 'spiced', 'flavored', 'sweetened', 'salted', 'peppered', 'heated', 'cooled', 'frozen',
    'melted', 'dissolved', 'evaporated', 'condensed', 'compressed', 'expanded', 'stretched', 'shrunk',
    'enlarged', 'reduced', 'increased', 'decreased', 'improved', 'enhanced', 'upgraded', 'downgraded',
    'fixed', 'repaired', 'mended', 'restored', 'renewed', 'refreshed', 'updated', 'modernized', 'renovated',
    'remodeled', 'redesigned', 'reconstructed', 'rebuilt', 'replaced', 'substituted', 'exchanged', 'swapped',
    'traded', 'sold', 'bought', 'purchased', 'acquired', 'obtained', 'gained', 'earned', 'won', 'lost',
    'found', 'discovered', 'located', 'identified', 'recognized', 'spotted', 'noticed', 'observed',
    'seen', 'watched', 'viewed', 'witnessed', 'heard', 'listened', 'overheard', 'smelled', 'tasted',
    'felt', 'touched', 'handled', 'held', 'gripped', 'squeezed', 'pulled', 'pushed', 'lifted', 'carried',
    'moved', 'transported', 'delivered', 'shipped', 'sent', 'received', 'collected', 'gathered', 'assembled',
    'accumulated', 'stored', 'saved', 'preserved', 'protected', 'defended', 'guarded', 'secured', 'locked',
    'unlocked', 'opened', 'closed', 'sealed', 'covered', 'uncovered', 'wrapped', 'unwrapped', 'packed',
    'unpacked', 'loaded', 'unloaded', 'filled', 'emptied', 'poured', 'spilled', 'dropped', 'picked',
    'chosen', 'selected', 'decided', 'determined', 'resolved', 'settled', 'concluded', 'finished',
    'completed', 'accomplished', 'achieved', 'succeeded', 'failed', 'attempted', 'tried', 'tested',
    'examined', 'inspected', 'checked', 'verified', 'confirmed', 'approved', 'accepted', 'rejected',
    'denied', 'refused', 'declined', 'dismissed', 'ignored', 'forgotten', 'remembered', 'recalled',
    'reminded', 'memorized', 'learned', 'studied', 'taught', 'trained', 'educated', 'informed', 'told',
    'explained', 'described', 'defined', 'clarified', 'illustrated', 'demonstrated', 'shown', 'displayed',
    'presented', 'introduced', 'announced', 'declared', 'stated', 'mentioned', 'noted', 'pointed',
    'indicated', 'suggested', 'recommended', 'advised', 'counseled', 'guided', 'directed', 'instructed',
    'ordered', 'commanded', 'requested', 'asked', 'questioned', 'inquired', 'investigated', 'researched',
    'explored', 'studied', 'analyzed', 'evaluated', 'assessed', 'judged', 'criticized', 'praised',
    'complimented', 'thanked', 'appreciated', 'valued', 'treasured', 'cherished', 'loved', 'adored',
    'worshipped', 'respected', 'admired', 'honored', 'celebrated', 'commemorated', 'remembered'
  ],
  purpose: [
    'sleeping', 'running', 'cooking', 'cleaning', 'writing', 'reading', 'swimming', 'dancing', 'singing',
    'playing', 'working', 'studying', 'teaching', 'learning', 'eating', 'drinking', 'driving', 'flying',
    'sailing', 'hiking', 'camping', 'hunting', 'fishing', 'gardening', 'painting', 'drawing', 'sewing',
    'knitting', 'building', 'repairing', 'measuring', 'cutting', 'grinding', 'mixing', 'storing',
    'protecting', 'decorating', 'lighting', 'heating', 'cooling', 'perfume', 'front', 'peculiar',
    'rusty', 'tarnished'
  ]
};

const ADVERB_DATABASE: Record<AdverbCategory, string[]> = {
  manner: [
    'quickly', 'slowly', 'carefully', 'carelessly', 'loudly', 'quietly', 'softly', 'harshly', 'gently', 'roughly',
    'smoothly', 'abruptly', 'suddenly', 'gradually', 'immediately', 'instantly', 'eventually', 'finally',
    'eagerly', 'reluctantly', 'willingly', 'unwillingly', 'confidently', 'nervously', 'calmly', 'frantically',
    'patiently', 'impatiently', 'politely', 'rudely', 'kindly', 'cruelly', 'honestly', 'dishonestly',
    'clearly', 'vaguely', 'precisely', 'approximately', 'exactly', 'roughly', 'beautifully', 'uglily'
  ],
  place: [
    'here', 'there', 'everywhere', 'anywhere', 'somewhere', 'nowhere', 'nearby', 'far', 'close', 'distant',
    'inside', 'outside', 'upstairs', 'downstairs', 'underground', 'overhead', 'abroad', 'home', 'away',
    'forward', 'backward', 'sideways', 'northward', 'southward', 'eastward', 'westward', 'inward', 'outward',
    'above', 'below', 'beneath', 'behind', 'ahead', 'around', 'through', 'across', 'along', 'beyond'
  ],
  frequency: [
    'always', 'never', 'often', 'rarely', 'seldom', 'sometimes', 'occasionally', 'frequently', 'constantly',
    'regularly', 'irregularly', 'continuously', 'intermittently', 'repeatedly', 'once', 'twice', 'thrice',
    'daily', 'weekly', 'monthly', 'yearly', 'annually', 'hourly', 'usually', 'normally', 'typically',
    'commonly', 'uncommonly', 'habitually', 'traditionally', 'customarily', 'ordinarily', 'generally'
  ],
  time: [
    'now', 'then', 'today', 'yesterday', 'tomorrow', 'tonight', 'earlier', 'later', 'soon', 'immediately',
    'recently', 'formerly', 'previously', 'currently', 'presently', 'afterwards', 'beforehand', 'meanwhile',
    'simultaneously', 'eventually', 'finally', 'initially', 'originally', 'ultimately', 'temporarily',
    'permanently', 'briefly', 'momentarily', 'instantly', 'suddenly', 'gradually', 'slowly', 'quickly'
  ],
  purpose: [
    'intentionally', 'accidentally', 'deliberately', 'purposely', 'consciously', 'unconsciously', 'voluntarily',
    'involuntarily', 'willingly', 'unwillingly', 'knowingly', 'unknowingly', 'specifically', 'generally',
    'particularly', 'especially', 'mainly', 'primarily', 'chiefly', 'mostly', 'largely', 'partly', 'entirely',
    'completely', 'partially', 'fully', 'totally', 'absolutely', 'relatively', 'comparatively'
  ]
};

export class AdjectiveClassifier {
  private database: Record<AdjectiveCategory, Set<string>>;
  private adverbDatabase: Record<AdverbCategory, Set<string>>;

  constructor() {
    // Convert arrays to sets for faster lookup and normalize to lowercase
    this.database = Object.entries(ADJECTIVE_DATABASE).reduce((acc, [category, words]) => {
      acc[category as AdjectiveCategory] = new Set(words.map(word => word.toLowerCase()));
      return acc;
    }, {} as Record<AdjectiveCategory, Set<string>>);

    this.adverbDatabase = Object.entries(ADVERB_DATABASE).reduce((acc, [category, words]) => {
      acc[category as AdverbCategory] = new Set(words.map(word => word.toLowerCase()));
      return acc;
    }, {} as Record<AdverbCategory, Set<string>>);
  }

  classifyAdjective(word: string): AdjectiveCategory | null {
    const lowercaseWord = word.toLowerCase();
    
    // Check each category in order of priority
    for (const category of CATEGORY_ORDER) {
      if (this.database[category].has(lowercaseWord)) {
        return category;
      }
    }
    
    return null;
  }

  classifyAdverb(word: string): AdverbCategory | null {
    const lowercaseWord = word.toLowerCase();
    
    // Check each category in order of priority
    for (const category of ADVERB_ORDER) {
      if (this.adverbDatabase[category].has(lowercaseWord)) {
        return category;
      }
    }
    
    return null;
  }

  extractAdjectives(sentence: string): string[] {
    // Enhanced word extraction with better noun-adjective position analysis
    const words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const foundAdjectives: string[] = [];
    
    // Check each word for direct match in database
    words.forEach((word, index) => {
      if (CATEGORY_ORDER.some(category => this.database[category].has(word))) {
        foundAdjectives.push(word);
      }
    });
    
    // Additional pattern matching for adjectives that might appear after nouns
    // Look for patterns like "bottle perfume" -> "perfume bottle"
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      
      // Check if current word could be a noun and next word is an adjective
      if (this.isPotentialNoun(currentWord) && this.classifyAdjective(nextWord)) {
        if (!foundAdjectives.includes(nextWord)) {
          foundAdjectives.push(nextWord);
        }
      }
    }
    
    return foundAdjectives;
  }

  private isPotentialNoun(word: string): boolean {
    // Simple heuristic to identify potential nouns
    const commonNouns = ['bottle', 'box', 'chest', 'sign', 'floor', 'window', 'vase', 'earrings', 'coins', 'scarves', 'tablecloths', 'candlesticks'];
    return commonNouns.includes(word.toLowerCase()) || 
           (word.length > 3 && !word.endsWith('ly') && !word.endsWith('ing'));
  }

  extractAdverbs(sentence: string): string[] {
    const words = sentence.toLowerCase().match(/\b[a-z]+\b/g) || [];
    
    return words.filter(word => {
      return ADVERB_ORDER.some(category => this.adverbDatabase[category].has(word));
    });
  }

  analyzeSentence(sentence: string): AdjectiveClassification[] {
    const adjectives = this.extractAdjectives(sentence);
    const words = sentence.toLowerCase().split(/\s+/);
    
    return adjectives.map(adjective => {
      const category = this.classifyAdjective(adjective);
      const position = words.indexOf(adjective.toLowerCase());
      
      return {
        word: adjective,
        category: category!,
        position,
        confidence: 1.0 // In a real implementation, this could be calculated
      };
    }).filter(classification => classification.category !== null);
  }

  analyzeAdverbs(sentence: string): AdverbClassification[] {
    const adverbs = this.extractAdverbs(sentence);
    const words = sentence.toLowerCase().split(/\s+/);
    
    return adverbs.map(adverb => {
      const category = this.classifyAdverb(adverb);
      const position = words.indexOf(adverb.toLowerCase());
      
      return {
        word: adverb,
        category: category!,
        position,
        confidence: 1.0
      };
    }).filter(classification => classification.category !== null);
  }

  findAdjectiveChains(sentence: string): Array<{ adjectives: AdjectiveClassification[]; startIndex: number; endIndex: number }> {
    const words = sentence.toLowerCase().split(/\s+/);
    const adjectives = this.analyzeSentence(sentence);
    const chains: Array<{ adjectives: AdjectiveClassification[]; startIndex: number; endIndex: number }> = [];
    
    if (adjectives.length === 0) return chains;
    
    // Group consecutive adjectives into chains
    let currentChain: AdjectiveClassification[] = [];
    let chainStart = -1;
    
    for (let i = 0; i < words.length; i++) {
      const adjective = adjectives.find(adj => adj.position === i);
      
      if (adjective) {
        if (currentChain.length === 0) {
          chainStart = i;
        }
        currentChain.push(adjective);
      } else {
        if (currentChain.length > 1) {
          chains.push({
            adjectives: currentChain,
            startIndex: chainStart,
            endIndex: i - 1
          });
        }
        currentChain = [];
      }
    }
    
    // Handle chain at end of sentence
    if (currentChain.length > 1) {
      chains.push({
        adjectives: currentChain,
        startIndex: chainStart,
        endIndex: words.length - 1
      });
    }
    
    return chains;
  }

  reorderAdjectives(sentence: string): { 
    original: string; 
    corrected: string; 
    changes: boolean;
    totalAdjectives: number;
    reorderedAdjectives: number;
    adjectiveChains: number;
    reorderedChains: number;
  } {
    const words = sentence.split(/\s+/);
    const adjectives = this.analyzeSentence(sentence);
    const chains = this.findAdjectiveChains(sentence);
    
    let totalReorderedAdjectives = 0;
    let reorderedChains = 0;
    let correctedWords = [...words];
    let hasChanges = false;
    
    // Process each chain separately
    for (const chain of chains) {
      const sortedChain = [...chain.adjectives].sort((a, b) => {
        const aIndex = CATEGORY_ORDER.indexOf(a.category);
        const bIndex = CATEGORY_ORDER.indexOf(b.category);
        return aIndex - bIndex;
      });
      
      // Check if this chain needs reordering
      const chainNeedsReordering = chain.adjectives.some((adj, index) => 
        sortedChain[index].word !== adj.word
      );
      
      if (chainNeedsReordering) {
        hasChanges = true;
        reorderedChains++;
        totalReorderedAdjectives += chain.adjectives.length;
        
        // Replace adjectives in their sorted positions within this chain
        const chainPositions = chain.adjectives.map(adj => adj.position).sort((a, b) => a - b);
        sortedChain.forEach((adj, index) => {
          if (chainPositions[index] !== undefined) {
            correctedWords[chainPositions[index]] = adj.word;
          }
        });
      }
    }
    
    return {
      original: sentence,
      corrected: correctedWords.join(' '),
      changes: hasChanges,
      totalAdjectives: adjectives.length,
      reorderedAdjectives: totalReorderedAdjectives,
      adjectiveChains: chains.length,
      reorderedChains
    };
  }

  analyzeMultipleSentences(text: string): {
    sentences: Array<{
      original: string;
      corrected: string;
      changes: boolean;
      totalAdjectives: number;
      reorderedAdjectives: number;
      adjectiveChains: number;
      reorderedChains: number;
      adjectives: AdjectiveClassification[];
      totalAdverbs: number;
      reorderedAdverbs: number;
      adverbChains: number;
      reorderedAdverbChains: number;
      adverbs: AdverbClassification[];
    }>;
    summary: {
      totalSentences: number;
      sentencesWithChanges: number;
      totalAdjectives: number;
      totalReorderedAdjectives: number;
      totalChains: number;
      totalReorderedChains: number;
      totalAdverbs: number;
      totalReorderedAdverbs: number;
      totalAdverbChains: number;
      totalReorderedAdverbChains: number;
    };
  } {
    // Split text into sentences
    const sentenceRegex = /[.!?]+/;
    const sentences = text.split(sentenceRegex)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    const results = sentences.map(sentence => {
      const reorderResult = this.reorderAdjectives(sentence);
      const adverbResult = this.reorderAdverbs(sentence);
      const adjectives = this.analyzeSentence(sentence);
      const adverbs = this.analyzeAdverbs(sentence);
      
      return {
        ...reorderResult,
        adjectives,
        totalAdverbs: adverbResult.totalAdverbs,
        reorderedAdverbs: adverbResult.reorderedAdverbs,
        adverbChains: adverbResult.adverbChains,
        reorderedAdverbChains: adverbResult.reorderedChains,
        adverbs
      };
    });
    
    const summary = {
      totalSentences: results.length,
      sentencesWithChanges: results.filter(r => r.changes).length,
      totalAdjectives: results.reduce((sum, r) => sum + r.totalAdjectives, 0),
      totalReorderedAdjectives: results.reduce((sum, r) => sum + r.reorderedAdjectives, 0),
      totalChains: results.reduce((sum, r) => sum + r.adjectiveChains, 0),
      totalReorderedChains: results.reduce((sum, r) => sum + r.reorderedChains, 0),
      totalAdverbs: results.reduce((sum, r) => sum + r.totalAdverbs, 0),
      totalReorderedAdverbs: results.reduce((sum, r) => sum + r.reorderedAdverbs, 0),
      totalAdverbChains: results.reduce((sum, r) => sum + r.adverbChains, 0),
      totalReorderedAdverbChains: results.reduce((sum, r) => sum + r.reorderedAdverbChains, 0)
    };
    
    return { sentences: results, summary };
  }

  reorderAdverbs(sentence: string): { 
    original: string; 
    corrected: string; 
    changes: boolean;
    totalAdverbs: number;
    reorderedAdverbs: number;
    adverbChains: number;
    reorderedChains: number;
  } {
    const words = sentence.split(/\s+/);
    const adverbs = this.analyzeAdverbs(sentence);
    const chains = findAdverbChains(sentence, adverbs);
    
    return reorderAdverbs(sentence, adverbs, chains);
  }
}