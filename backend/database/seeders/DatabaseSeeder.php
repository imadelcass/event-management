<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Normal user
        User::factory()->create([
            'name' => 'Normal User',
            'email' => 'normal-user@example.com',
            'is_admin' => false,
            'password' => bcrypt('password'),
        ]);

        // Admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin-user@example.com',
            'is_admin' => true,
            'password' => bcrypt('password'),
        ]);
    }
}
