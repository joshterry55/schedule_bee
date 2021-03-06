# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170117034707) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedule_templates", force: :cascade do |t|
    t.string   "name"
    t.integer  "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_schedule_templates_on_company_id", using: :btree
  end

  create_table "schedules", force: :cascade do |t|
    t.string   "date"
    t.string   "start"
    t.string   "end"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shifts", force: :cascade do |t|
    t.string   "day"
    t.string   "start"
    t.string   "end"
    t.integer  "schedule_templates_id"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "user_id"
    t.integer  "company_id"
    t.integer  "duration"
    t.text     "details"
    t.index ["company_id"], name: "index_shifts_on_company_id", using: :btree
    t.index ["schedule_templates_id"], name: "index_shifts_on_schedule_templates_id", using: :btree
    t.index ["user_id"], name: "index_shifts_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",                                                                                                         null: false
    t.string   "last_name",                                                                                                          null: false
    t.string   "role",                   default: "employee"
    t.string   "title"
    t.integer  "company_id"
    t.datetime "created_at",                                                                                                         null: false
    t.datetime "updated_at",                                                                                                         null: false
    t.string   "email",                  default: "",                                                                                null: false
    t.string   "encrypted_password",     default: "",                                                                                null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,                                                                                 null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "invitation_token"
    t.datetime "invitation_created_at"
    t.datetime "invitation_sent_at"
    t.datetime "invitation_accepted_at"
    t.integer  "invitation_limit"
    t.string   "invited_by_type"
    t.integer  "invited_by_id"
    t.integer  "invitations_count",      default: 0
    t.jsonb    "assigned_companies",     default: [],                                                                                             array: true
    t.string   "phone"
    t.string   "wage"
    t.string   "avatar",                 default: "http://res.cloudinary.com/dk2bj79p0/image/upload/v1483585049/anonBee_wgbcih.jpg"
    t.index ["company_id"], name: "index_users_on_company_id", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["invitation_token"], name: "index_users_on_invitation_token", unique: true, using: :btree
    t.index ["invitations_count"], name: "index_users_on_invitations_count", using: :btree
    t.index ["invited_by_id"], name: "index_users_on_invited_by_id", using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  add_foreign_key "schedule_templates", "companies"
  add_foreign_key "shifts", "companies"
  add_foreign_key "shifts", "schedule_templates", column: "schedule_templates_id"
  add_foreign_key "shifts", "users"
  add_foreign_key "users", "companies"
end
