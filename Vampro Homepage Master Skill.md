# Vampro Homepage Master Skill
Version: 1.0

---

# Identity

You are not building a landing page.

You are directing an interactive cinematic experience.

The Vampro homepage should feel like a premium product launch from Apple, Linear, Figma or Stripe—not a traditional agency website.

Visitors should remember the experience before they remember the content.

Every scroll should feel intentional.

Every animation should tell a story.

Nothing exists purely for decoration.

---

# Core Philosophy

The homepage tells one story.

A finished video is made from countless invisible creative disciplines.

As the visitor scrolls, they travel backwards through the filmmaking process.

The completed film gradually reveals everything that made it possible.

When scrolling upward, every component naturally reconstructs into the finished film.

The entire experience must feel reversible.

The homepage is one continuous scene rather than a collection of independent sections.

---

# Homepage Structure

The homepage contains only these sections.

1. Hero
2. Our Story
3. Our Services
4. Voice Plugin
5. Explore Blogs
6. YouTube Showcase

These are not independent sections.

Each section must emerge naturally from the previous one.

---

# Narrative Flow

The visitor experiences this journey.

Finished Video

↓

The video pauses.

↓

The frame begins separating into creative layers.

↓

The storyboard appears.

↓

OUR STORY

↓

The storyboard expands into the production workflow.

↓

OUR SERVICES

↓

The production workflow evolves into audio.

↓

VOICE PLUGIN

↓

The waveform becomes knowledge.

↓

BLOGS

↓

Knowledge transforms into finished content.

↓

YOUTUBE SHOWCASE

↓

Everything combines into the completed film again.

Every transition must feel inevitable.

---

# Story Breakdown

## Hero

Purpose

Show the final product.

The visitor immediately understands what Vampro creates.

Visual

Minimal monochrome wireframe video.

The clip plays automatically.

No UI.

No distractions.

Only the video.

Headline

One bold statement.

Supporting text beneath.

CTA below.

Animation

The video plays naturally.

When the user begins scrolling:

The playback slows.

The frame freezes.

The camera begins moving into the scene.

The film prepares to disassemble.

---

## Transition 01

Hero → Our Story

The frozen video frame fractures into multiple wireframe layers.

Foreground.

Background.

Lighting.

Camera path.

Motion path.

Composition guides.

One layer unfolds into storyboard frames.

The storyboard expands to fill the screen.

The storyboard becomes the Our Story section.

Never fade.

Never replace.

Morph.

---

## Our Story

Purpose

Explain why Vampro exists.

Not company history.

Explain the philosophy.

Ideas become stories.

Stories become visuals.

Visual

Wireframe storyboard.

Sketches.

Creative notes.

Production arrows.

Minimal annotations.

Animation

As scrolling continues:

The storyboard becomes increasingly detailed.

Frames connect together.

Planning becomes production.

---

## Transition 02

Our Story → Services

The storyboard grows.

Frames connect.

Planning arrows become production flow.

The production flow becomes the creative pipeline.

Each pipeline branch becomes one service.

Writing.

Filming.

Editing.

Motion Graphics.

Audio.

Color.

The pipeline itself transforms into the Services section.

---

## Our Services

Purpose

Show how ideas become videos.

Visual

Technical blueprint.

Production pipeline.

Connected workflow.

Each service is part of one system.

Never isolated cards.

Animation

Each discipline activates.

Writing.

↓

Storyboard.

↓

Camera.

↓

Editing.

↓

Color.

↓

Sound.

↓

Delivery.

The visitor should understand that every service contributes to the final product.

---

## Transition 03

Services → Voice Plugin

The audio branch separates from the production pipeline.

The waveform becomes dominant.

The waveform grows.

Transforms into microphone input.

Transforms into generated narration.

Transforms into Premiere timeline.

The Premiere timeline becomes the Voice Plugin showcase.

---

## Voice Plugin

Purpose

Showcase the Adobe Premiere AI Voice Plugin.

Visual

Minimal Premiere-inspired interface.

Wireframe timeline.

Waveform.

Voice generation.

Generated narration.

Animation

Typing.

Waveform generation.

Audio rendering.

Timeline updates.

Everything feels live.

No fake loading animations.

---

## Transition 04

Voice Plugin → Blogs

The waveform becomes text.

Text becomes documentation.

Documentation becomes organized knowledge.

Knowledge expands into article cards.

The cards become the Blog section.

---

## Explore Blogs

Purpose

Demonstrate expertise.

Teach.

Educate.

Share knowledge.

Visual

Minimal article cards.

Documentation aesthetic.

Technical diagrams.

Code snippets where appropriate.

Animation

Cards assemble from documentation pages.

Articles connect together.

Knowledge grows organically.

---

## Transition 05

Blogs → YouTube

One article opens.

Paragraphs become script.

Script becomes subtitles.

Subtitles become video frames.

Video frames become thumbnails.

The thumbnails become the YouTube showcase.

---

## YouTube Showcase

Purpose

Show the finished work.

Visual

Video wall.

Featured content.

Wireframe player.

Minimal controls.

Animation

Thumbnails animate into one featured video.

The featured video becomes the original hero video.

The loop is complete.

Scrolling upward reverses everything perfectly.

---

# Motion Principles

Every movement explains something.

Nothing moves randomly.

Nothing floats.

Nothing spins for decoration.

Everything transforms.

Everything evolves.

Every object has a purpose.

The visitor should always understand:

Why this object appeared.

Why it moved.

Where it came from.

What it became.

---

# Transition Rules

Never

Fade between sections.

Hard cuts.

Teleport objects.

Random floating animations.

Instead use

Morph

Merge

Split

Expand

Collapse

Fold

Assemble

Disassemble

Rotate with purpose

Scale naturally

Every transition preserves visual continuity.

One object always becomes another.

---

# Scroll System

Use one pinned fullscreen scene.

The website should behave like one giant timeline.

Scrolling changes animation progress.

Animations must scrub with scroll.

The animation stops exactly where scrolling stops.

Scrolling upward reverses everything.

No autoplay once scrolling begins.

---

# Technical Architecture

Use

React

TypeScript

GSAP

ScrollTrigger

Lenis

SVG

Optional

React Three Fiber only if genuine depth is required.

Avoid unnecessary libraries.

---

# React Structure

src/

components/

scenes/

HeroScene

StoryScene

ServicesScene

VoiceScene

BlogScene

YoutubeScene

controllers/

SceneController

TimelineController

hooks/

useScrollTimeline

useGSAP

animations/

transitions/

assets/

wireframes/

svg/

videos/

utils/

config/

Every scene manages only itself.

The master timeline coordinates all scenes.

No scene knows about another.

---

# GSAP Standards

One master timeline.

One ScrollTrigger.

Pinned canvas.

Scrubbed animation.

Labels for each section.

Cleanup timelines on unmount.

Cache references.

Never animate layout properties.

Animate only

transform

opacity

clip-path

SVG paths

filters (minimal)

Avoid

width

height

margin

padding

top

left

---

# Performance Rules

Target 60 FPS.

Prefer SVG.

Prefer transforms.

Lazy-load heavy assets.

Avoid layout shifts.

Avoid unnecessary React state.

Memoize expensive components.

Use requestAnimationFrame only where necessary.

Compress videos.

Use image sequences only if true frame-perfect scrubbing is required.

---

# Visual Language

Everything is monochrome.

White.

Black.

Gray.

Thin outlines.

Blueprint aesthetic.

Architectural drawings.

Wireframe models.

Technical diagrams.

Generous whitespace.

Large typography.

Minimal UI.

No gradients.

No glassmorphism.

No neon.

No excessive shadows.

No glossy effects.

Premium through restraint.

---

# Cinematography Principles

Think like a filmmaker.

Use

Dolly

Pan

Tilt

Push

Pull

Reveal

Rack focus (simulated)

Avoid

Sudden rotations

Wild zooms

Chaotic motion

Camera movement should feel physically believable.

Motion should have weight.

Objects should feel connected.

---

# UX Principles

The visitor should never feel lost.

Every scroll answers one question.

Hero

"What does Vampro create?"

↓

Our Story

"Why does Vampro exist?"

↓

Services

"How is the work created?"

↓

Voice Plugin

"What tools power the workflow?"

↓

Blogs

"How does Vampro share knowledge?"

↓

YouTube

"What does the final result look like?"

If a transition does not answer the next question naturally, redesign it.

---

# Premium Quality Checklist

Before accepting any implementation, verify:

□ Does this feel like an experience instead of a webpage?

□ Does every animation communicate meaning?

□ Does every section emerge naturally from the previous one?

□ Can every animation reverse perfectly while scrolling upward?

□ Is there a single visual language across the homepage?

□ Is the homepage readable even without animation?

□ Does every object transform instead of disappearing?

□ Is performance consistently smooth?

□ Are interactions subtle rather than flashy?

□ Is whitespace used intentionally?

□ Does the camera movement feel cinematic?

□ Is every transition visually continuous?

□ Does this feel handcrafted rather than template-based?

□ Would this interaction feel at home on an Apple or Linear product page?

If any answer is "No", continue refining before considering the work complete.

---

# Golden Rule

Never think in terms of sections.

Think in terms of scenes.

Never think in terms of pages.

Think in terms of one continuous film.

The visitor should finish the homepage feeling like they have watched the entire creative process unfold—and that Vampro isn't just a video company, but a system that transforms ideas into finished stories.