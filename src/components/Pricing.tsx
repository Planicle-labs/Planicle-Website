"use client";

import { useRef } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useReducedMotion,
} from "framer-motion";

const plans = [
	{
		name: "Identity",
		price: "7,999",
		target: "Consultants, creators, personal brands.",
		description: "Your digital business card, engineered to convert.",
		features: [
			"High-performance website",
			"Social proof integration",
			"Lead capture system",
			"Local SEO setup",
			"Training included",
		],
		highlighted: false,
		btnText: "Secure Slot",
	},
	{
		name: "Growth",
		price: "14,999",
		target: "Clinics, agencies, local businesses.",
		description: "The complete package to dominate your local market.",
		features: [
			"Multi-page content strategy",
			"CMS integration (self-edit)",
			"WhatsApp booking + CRM",
			"SEO setup",
			"1-hour training included",
		],
		highlighted: true,
		btnText: "Start Growth",
	},
	{
		name: "Ecosystem",
		price: "29,999+",
		target: "SaaS, e-commerce, startups.",
		description: "Custom architecture for businesses that need to scale.",
		features: [
			"Custom web app architecture",
			"User authentication flows",
			"Payment gateway (Razorpay/Stripe)",
			"Admin dashboard",
			"Scales to 10k+ users",
		],
		highlighted: false,
		btnText: "Book Strategy",
	},
];

function PricingCard({
	plan,
	index,
}: {
	plan: (typeof plans)[number];
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const prefersReduced = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start 0.95", "center 0.6"],
	});

	// Stagger each card's reveal
	const staggerDelay = index * 0.12;

	// 3D unfold — card rotates forward as if being placed on a table
	const rotateX = useTransform(
		scrollYProgress,
		[0 + staggerDelay, 0.6 + staggerDelay],
		prefersReduced ? [0, 0] : [-12, 0],
	);
	const opacity = useTransform(
		scrollYProgress,
		[0 + staggerDelay, 0.5 + staggerDelay],
		prefersReduced ? [1, 1] : [0, 1],
	);
	const y = useTransform(
		scrollYProgress,
		[0 + staggerDelay, 0.6 + staggerDelay],
		prefersReduced ? [0, 0] : [40, plan.highlighted ? -6 : 0],
	);
	const scale = useTransform(
		scrollYProgress,
		[0 + staggerDelay, 0.6 + staggerDelay],
		prefersReduced ? [1, 1] : [0.96, 1],
	);

	return (
		<motion.div
			ref={ref}
			style={{
				rotateX,
				opacity,
				y,
				scale,
				transformStyle: "preserve-3d",
			}}
			className={`relative flex flex-col p-8 md:p-10 ${
				plan.highlighted ? "bg-primary/[0.06]" : "bg-background"
			}`}
		>
			{plan.highlighted && (
				<div className="absolute top-0 left-0 right-0 h-px bg-primary" />
			)}

			{/* Plan name */}
			<div className="flex items-center justify-between mb-8">
				<span className="font-display text-sm font-bold text-text-tertiary uppercase tracking-[0.05em]">
					{plan.name}
				</span>
				{plan.highlighted && (
					<span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2.5 py-1 rounded-full bg-primary/20 text-primary">
						Popular
					</span>
				)}
			</div>

			{/* Price */}
			<div className="font-display text-4xl md:text-5xl font-bold mb-2 flex items-start gap-1">
				<span className="text-lg text-text-tertiary mt-2">₹</span>
				{plan.price}
			</div>

			<p className="text-sm font-medium text-foreground mb-1">
				{plan.target}
			</p>
			<p className="text-sm text-text-tertiary mb-10 leading-relaxed">
				{plan.description}
			</p>

			{/* Features */}
			<ul className="flex-1 flex flex-col gap-3.5 mb-10">
				{plan.features.map((feature) => (
					<li
						key={feature}
						className="flex items-start gap-3 text-sm text-text-secondary"
					>
						<svg
							className="w-4 h-4 text-accent shrink-0 mt-0.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
						>
							<polyline points="20 6 9 17 4 12" />
						</svg>
						{feature}
					</li>
				))}
			</ul>

			{/* CTA */}
			<a
				href="#cta"
				className={`group flex items-center justify-between w-full py-4 px-6 text-[11px] uppercase tracking-[0.05em] font-bold border transition-all duration-300 ease-out-quint ${
					plan.highlighted
						? "border-primary bg-primary text-foreground hover:bg-primary-hover"
						: "border-border hover:border-foreground hover:bg-foreground hover:text-background"
				}`}
			>
				{plan.btnText}
				<svg
					className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</a>
		</motion.div>
	);
}

export function Pricing() {
	const sectionRef = useRef<HTMLElement>(null);
	const prefersReduced = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start 0.9", "start 0.35"],
	});

	// Header entrance
	const headerOpacity = useTransform(
		scrollYProgress,
		[0, 0.4],
		prefersReduced ? [1, 1] : [0, 1],
	);
	const headerY = useTransform(
		scrollYProgress,
		[0, 0.4],
		prefersReduced ? [0, 0] : [30, 0],
	);
	const subOpacity = useTransform(
		scrollYProgress,
		[0.1, 0.5],
		prefersReduced ? [1, 1] : [0, 1],
	);
	const subY = useTransform(
		scrollYProgress,
		[0.1, 0.5],
		prefersReduced ? [0, 0] : [20, 0],
	);

	return (
		<section
			ref={sectionRef}
			id="pricing"
			className="py-28 md:py-40 px-6 md:px-12 border-t border-border"
		>
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 mb-20 md:mb-28">
					<motion.div style={{ opacity: headerOpacity, y: headerY }}>
						<h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
							Transparent
							<br />
							<span className="text-text-secondary">
								pricing.
							</span>
						</h2>
					</motion.div>

					<motion.div
						style={{ opacity: subOpacity, y: subY }}
						className="flex flex-col gap-6 lg:pt-3"
					>
						<p className="text-text-secondary text-lg leading-relaxed max-w-lg">
							No monthly rent. You own the code. We build it, hand
							over the keys. Zero lock-in.
						</p>
						<p className="text-text-tertiary text-sm max-w-md">
							Validate the idea first, scale when the revenue
							hits. These packages get you to proof of concept
							fast.
						</p>
					</motion.div>
				</div>

				{/* Pricing grid — 3D unfold */}
				<div className="perspective-container">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/50">
						{plans.map((plan, index) => (
							<PricingCard
								key={plan.name}
								plan={plan}
								index={index}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
