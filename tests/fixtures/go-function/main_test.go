package main

import "testing"

func TestGreeting(t *testing.T) {
	got := Greeting("fixture")
	want := "hello, fixture"
	if got != want {
		t.Errorf("Greeting() = %q, want %q", got, want)
	}
}
