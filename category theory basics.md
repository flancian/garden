- a [[class]]
	- on [[2021-05-30]]

Idea of what [[category theory]] is. Basic definition of mathematical concepts.

Notions that are important in category theory. Commutative diagrams; categories as kinds of [[context]]. At the end, how this fits in a bigger picture.

![[Pasted image 20210530135545.png]]

Aside: I'm reading Feynman and this fits in amazingly well with the introduction of that book, six easy pieces.

An [[elegant framework]] for reasoning about situations where we are composing stuff together. [[modeling]], [[computation]].

Category theory is about [[composing stuff]] together.

![[Pasted image 20210530135718.png]]

Example: composing [[journeys]].

![[Pasted image 20210530135755.png]]

Example: composing processes. Mathematical functions, algorithms, physical processes.

![[Pasted image 20210530135825.png]]

Notation: boxes instead of arrows. Directionality is from left to right.

![[Pasted image 20210530135906.png]]

The output of the first box is the same [[type]] as the input of the second.

![[Pasted image 20210530135937.png]]

You can also compose physical components, of course.

![[Pasted image 20210530140048.png]]

And physical processes.

![[Pasted image 20210530140116.png]]

The fundamental example is mathematical; composing functions as sets.

![[Pasted image 20210530140203.png]]
![[Pasted image 20210530140223.png]]

Aside: we should put this on youtube.

We'll be used 'then' notations for compositions, not traditional.

![[Pasted image 20210530140255.png]]
![[Pasted image 20210530140312.png]]

We'll relate [[objects]]. The things doing the relating are [[morphisms]].

(here there should be a better screenshot, I couldn't get it on time)
![[Pasted image 20210530140421.png]]
![[Pasted image 20210530140330.png]]

Each morphism has a [[source]] and a [[target]].

We can compose morphisms when the target of the first matches the source of the second.

Common feature of all examples: they are a[[associative]]. The order of *composition* doesn't matter; the order of application may. (check)

![[Pasted image 20210530140543.png]]

![[Pasted image 20210530140623.png]]
![[Pasted image 20210530140657.png]]
![[Pasted image 20210530140711.png]]

This was [[true]] for all the examples we looked at so far.

Associativity means that brackets are not needed.

![[Pasted image 20210530140748.png]]

Aside: going from a class in real time to screenshots is one morphism; going from screenshots to notes is another. Going from notes to a chapter or blog post is another.

Associativiy in plugs:

![[Pasted image 20210530140849.png]]

Identity morphisms: morphisms that do nothing. Like a zero in addition.

Identity morphism for functions: the identity function.

![[Pasted image 20210530140955.png]]

A converter that converts to the same electrical standard is just an extension that can become a converter of any type with one additional composition.

![[Pasted image 20210530141056.png]]

[[identity journeys]] (aside: I call these [[excursions]])

![[Pasted image 20210530141124.png]]

Mathematical notion of a category

![[Pasted image 20210530141159.png]]

Aside: I think most concepts had been introduced before except one?

"F is a morphism from X to Y":

![[Pasted image 20210530141245.png]]

Identity morphisms:

![[Pasted image 20210530141302.png]]

Composition:

![[Pasted image 20210530141330.png]]

Unitality: identity "works" (I think this was the concept I thought hadn't been defined previously):

![[Pasted image 20210530141404.png]]

The [[category of sets and functions]] plays a central role in category:

![[Pasted image 20210530141427.png]]

The [[category of plugs and chords]]:

![[Pasted image 20210530141507.png]]

The [[category of journeys]]:

![[Pasted image 20210530141542.png]]
![[Pasted image 20210530141611.png]]

(Aside: some screenshots might be duplicate, they are likely from two moments that felt significant)

Any directed graph generates a category.

![[Pasted image 20210530141716.png]]

(Aside: a directed graph generates dependency trees.)

But categories are [[richer]] than [[directed graphs]], so they aren't used that much as such.

![[Pasted image 20210530141809.png]]

Category theory is interested in [[relations between morphisms]].

![[Pasted image 20210530141831.png]]

if f;g is equal to h, this diagram [[commutes]].

![[Pasted image 20210530141857.png]]

Aside: when you say 'if you compose' something, it'd be nice to have the right notation for the composition on screen.

![[Pasted image 20210530141942.png]]

[[commutative diagrams]]

![[Pasted image 20210530141956.png]]

Sameness: [[isomorphism]]. Identity is equal to roundtrip.

![[Pasted image 20210530142018.png]]

A context.

![[Pasted image 20210530142110.png]]

(Aside: I needed more time in this slide).

Contexts leads to [[universal constructions]] and [[universal properties]].

![[Pasted image 20210530142206.png]]

Example: [[categorical product]].

You start with objects, no morphisms. From the left diagram, you construct one with [[morphisms]]. In this one, we generalize cartesian product.

![[Pasted image 20210530142319.png]]

[[pushouts]]  Using the information given by f and g, you [[integrate]] two objects (check).

![[Pasted image 20210530142330.png]]

Additional structures: [[monoidal products]]. A way to compose objects and morphisms "in parallel".

(Aside: it would be nice to have original and post application of composition side by side or top to bottom).

(Aside: missing screenshot here, find in Pictures)
![[Pasted image 20210530142541.png]]
![[Pasted image 20210530142425.png]]
