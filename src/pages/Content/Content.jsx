import React, { useEffect, useState } from "react";
import {
  Map,
  Route,
  BookOpen,
  ShieldCheck,
  Images,
  Plane,
  Phone,
  RefreshCw,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

import axiosInstance from "../../api/axiosInstance";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const CONTENT_MODULES = [
  {
    key: "destinations",
    title: "Destinations",
    description: "Manage destination content and travel locations.",
    icon: Map,
    path: "/destinations",
    api: "/destinations",
  },
  {
    key: "itineraries",
    title: "Itineraries",
    description: "Manage travel plans and destination itineraries.",
    icon: Route,
    path: "/itineraries",
    api: "/itineraries",
  },
  {
    key: "resources",
    title: "Resources",
    description: "Manage travel resources and useful content.",
    icon: BookOpen,
    path: "/resources",
    api: "/resources",
  },
  {
    key: "dosDonts",
    title: "Dos & Don'ts",
    description: "Manage travel guidelines and visitor information.",
    icon: ShieldCheck,
    path: "/dos-donts",
    api: "/dos-donts",
  },
  {
    key: "gallery",
    title: "Gallery",
    description: "Manage destination videos and gallery content.",
    icon: Images,
    path: "/gallery",
    api: "/videos",
  },
  {
    key: "travelInfo",
    title: "Travel Info",
    description: "Manage essential travel information.",
    icon: Plane,
    path: "/travel-info",
    api: "/travel-info",
  },
  {
    key: "contact",
    title: "Contact",
    description: "Manage contact and communication information.",
    icon: Phone,
    path: "/contact",
    api: "/contact",
  },
];

const getResponseItems = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const Content = () => {
  const [moduleData, setModuleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadContent = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const results = await Promise.allSettled(
        CONTENT_MODULES.map((module) =>
          axiosInstance.get(module.api)
        )
      );

      const nextData = {};

      results.forEach((result, index) => {
        const module = CONTENT_MODULES[index];

        if (result.status === "fulfilled") {
          const response = result.value;

          nextData[module.key] = {
            success: response?.data?.success !== false,
            items: getResponseItems(response),
            count:
              typeof response?.data?.count === "number"
                ? response.data.count
                : getResponseItems(response).length,
            error: "",
          };
        } else {
          nextData[module.key] = {
            success: false,
            items: [],
            count: 0,
            error:
              result.reason?.response?.data?.message ||
              result.reason?.message ||
              "API request failed.",
          };
        }
      });

      setModuleData(nextData);

      const failed = Object.values(nextData).filter(
        (item) => !item.success
      );

      if (failed.length === CONTENT_MODULES.length) {
        setError("Unable to load content APIs.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load content."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const totalItems = Object.values(moduleData).reduce(
    (total, item) => total + (item?.count || 0),
    0
  );

  const activeModules = Object.values(moduleData).filter(
    (item) => item?.success
  ).length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-[2rem] bg-[#0d0d0d] p-6 text-white shadow-2xl sm:p-8"
      >
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#c9a45c]/10 blur-3xl" />

        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c9a45c]/20 bg-[#c9a45c]/10 px-3 py-1.5 text-xs font-semibold text-[#c9a45c]">
              <Sparkles size={13} />
              MP Escapes
            </div>

            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Content Overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Monitor and manage all major content modules from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadContent(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#c9a45c] px-5 py-3 text-sm font-semibold text-black shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Content"}
          </button>
        </div>
      </motion.div>

      {error && (
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          <XCircle size={18} />
          <span>{error}</span>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#e8e3d8] bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                Content Modules
              </p>

              <p className="mt-3 font-display text-3xl font-semibold text-[#151515]">
                {CONTENT_MODULES.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d0d0d] text-[#c9a45c]">
              <FileText size={20} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#e8e3d8] bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                API Records
              </p>

              <p className="mt-3 font-display text-3xl font-semibold text-[#151515]">
                {loading ? "—" : totalItems}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d0d0d] text-[#c9a45c]">
              <DatabaseIcon />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-3xl border border-[#e8e3d8] bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                APIs Connected
              </p>

              <p className="mt-3 font-display text-3xl font-semibold text-[#151515]">
                {loading
                  ? "—"
                  : `${activeModules}/${CONTENT_MODULES.length}`}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d0d0d] text-[#c9a45c]">
              <CheckCircle2 size={20} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="rounded-[2rem] border border-[#e8e3d8] bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6">
          <h2 className="font-display text-xl font-semibold text-[#151515]">
            Content Modules
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            API response status and available records for each content module.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d0d0d] shadow-xl">
                <div className="absolute inset-1 animate-spin rounded-xl border-2 border-transparent border-t-[#c9a45c]" />
                <FileText size={23} className="text-[#c9a45c]" />
              </div>

              <p className="text-sm font-medium text-gray-500">
                Loading content APIs...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CONTENT_MODULES.map((module, index) => {
              const Icon = module.icon;
              const data = moduleData[module.key] || {};
              const isSuccess = data.success;

              return (
                <motion.div
                  key={module.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#e8e3d8] bg-white p-5 shadow-sm transition hover:shadow-xl"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#c9a45c]/5 transition duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d0d0d] text-[#c9a45c] shadow-md">
                        <Icon size={20} />
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] ${
                          isSuccess
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {isSuccess ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}

                        {isSuccess ? "Connected" : "Failed"}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-[#151515]">
                      {module.title}
                    </h3>

                    <p className="mt-2 min-h-[42px] text-sm leading-5 text-gray-500">
                      {module.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-[#f7f5ef] p-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                          Records
                        </p>

                        <p className="mt-1 text-xl font-semibold text-[#151515]">
                          {data.count || 0}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#f7f5ef] p-3">
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-400">
                          API
                        </p>

                        <p className="mt-1 truncate text-xs font-semibold text-[#151515]">
                          {module.api}
                        </p>
                      </div>
                    </div>

                    {data.error && (
                      <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs leading-5 text-red-600">
                        {data.error}
                      </p>
                    )}

                    <a
                      href={module.path}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0d0d0d] px-4 py-2.5 text-xs font-semibold text-[#c9a45c] transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      Open Module
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

function DatabaseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" />
    </svg>
  );
}

export default Content;