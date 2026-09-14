"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@/design-system/primitives/Button";
import { motionTokens } from "@/design-system/tokens/motion";
export function MobileNavigation({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const t = useTranslations("navigation");
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const reduce = useReducedMotion();
  return (
    <div className="md:hidden">
      <Button
        variant="quiet"
        className="px-2"
        aria-label={t("openMenu")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <IconMenu2 size={22} stroke={1.4} />
      </Button>
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-label={t("label")}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ink p-6 text-ivory backdrop:bg-ink/90"
      >
        <div className="flex justify-end">
          <Button
            variant="quiet"
            aria-label={t("closeMenu")}
            onClick={() => dialog.current?.close()}
          >
            <IconX size={24} stroke={1.4} />
          </Button>
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open || reduce ? 0 : 12 }}
          transition={{ duration: reduce ? 0 : motionTokens.uiDuration }}
          className="mt-28 flex flex-col gap-12"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => dialog.current?.close()}
              className="text-4xl leading-relaxed focus-visible:outline-2 focus-visible:outline-gold"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </dialog>
    </div>
  );
}
